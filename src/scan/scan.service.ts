import { 
    Inject, 
    Injectable,
    Logger,
} from '@nestjs/common';
import { 
    CACHE_MANAGER,
    Cache
} from '@nestjs/cache-manager';
import { 
  HttpClient,
  InjectHttpClient
} from '@nestjs/http-client';
import { ReviewsService } from '../reviews/reviews.service.js';
import { LocationDto } from './dto/location.dto.js';
import { ProductDetailsDto } from './dto/product-details.dto.js';
import { RepairPlaceDto } from './dto/repair-place.dto.js';
import { ScanResponseDto } from './dto/scan-response.dto.js';

const REPAIR_RADIUS_METERS = 500;
const REPAIR_MAX_RESULTS = 5;
const PLACES_FIELD_MASK = [
  'places.displayName',
  'places.routingSummaries.legs.distanceMeters',
].join(',');

@Injectable()
export class ScanService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectHttpClient('places') private readonly places: HttpClient,
    @InjectHttpClient('upc') private readonly upc: HttpClient,
    private readonly reviewsService: ReviewsService,
  ) {}

  private readonly logger = new Logger(ScanService.name);

  private async searchNearbyPlaces(ubicacion: LocationDto) {
    const body = {
      includedTypes: ['repair service'],
      maxResultCount: REPAIR_MAX_RESULTS,
      locationRestriction: {
        circle: { center: origin, radius: REPAIR_RADIUS_METERS },
      },
      routingParameters: { origin, travelMode: 'WALK' },
    };

    return await this.places.post<Response>('/places:searchNearby', {
      json: {
        includedTypes: ['repair service'],
        maxResultCount: REPAIR_MAX_RESULTS,
        locationRestriction: {
          circle: {
            center: {
              latitude: ubicacion.latitud,
              longitude: ubicacion.longitud,
            },
            radius: REPAIR_RADIUS_METERS,
          },
        },
      },
      headers: { 'X-Goog-FieldMask': PLACES_FIELD_MASK, }
    });
  }

  private async getProductInfo(barcode: string) {
    return await this.upc.get<Response>(`/code/${barcode}`, {
        params: { barcode },
        query: { format: 'true' },
      }
    );
  }
  
  async aggregate (
    barcode: string,
    ubicacion: LocationDto,
  ): Promise<ScanResponseDto> {
    const [producto, reparaciones, reseñas] = await Promise.allSettled([
      this.getProductInfo(barcode),
      this.searchNearbyPlaces(ubicacion),
      this.reviewsService.findAllByTypeOfCriteria(barcode, 'USO'),
    ]);

    const result = {
      producto: this.map_product(this.valorOrNull(producto, 'producto')),
      reparaciones: this.map_places(this.valorOrNull(reparaciones, 'reparaciones')),
      reseñas: this.valorOrNull(reseñas, 'reseñas') ?? [],
    };

    await this.cache.set(barcode, result, 3600);

    return result;
  }

  private valorOrNull<T>(result: PromiseSettledResult<T>, nombre: string): T | null {
    if (result.status === 'fulfilled') return result.value;
    this.logger.warn(`Falló la carga de ${nombre}: ${(result.reason as Error)?.message}`);
    return null;
  }

  private map_product(
    response: any | null
  ): ProductDetailsDto | null {
    if (!response) return null;
    const { product } = response;

    return {
      nombre: product.name,
      marca: product.brand,
      descripcion: product.description,
      imagenUrl: product.imageUrl,
      categoria: product.category,
      especificaciones: product.specs ? Object.fromEntries(product.specs) : undefined,
      inferido: response.inferred,
    };
  }

  private map_places(response: any | null): RepairPlaceDto[] {
    return (response?.places ?? []).map((place: any, i: number) => ({
      nombre: place.displayName.text,
      distanciaMetros: response?.routingSummaries?.[i]?.legs?.[0]?.distanceMeters,
    }));
  }
}