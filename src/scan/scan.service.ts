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
  'routingSummaries.legs.distanceMeters',
  'places.googleMapsUri' 
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
    const origin = {
      latitude: ubicacion.latitud,
      longitude: ubicacion.longitud,
    };

    const body = {
      textQuery: 'reparación de celulares computadoras y electrónicos',
      languageCode: 'es',
      pageSize: REPAIR_MAX_RESULTS,
      locationBias: {
        circle: { center: origin, radius: REPAIR_RADIUS_METERS },
      },
      routingParameters: { origin, travelMode: 'WALK' },
    };

    return await this.places.post<Response>('/places:searchText', {
      json: body,
      headers: { 'X-Goog-FieldMask': PLACES_FIELD_MASK },
    });
}

  private async getProductInfo(barcode: string) {
    return await this.upc.get<Response>('/:barcode', {
        params: { barcode },
        query: { format: 'true' },
      }
    );
  }
  
  async aggregate (
    barcode: string,
    ubicacion: LocationDto,
  ): Promise<ScanResponseDto> {
    
    let cached: ScanResponseDto | undefined;
    try {
      cached = await this.cache.get<ScanResponseDto>(barcode);
    } catch (err) {
      this.logger.warn(`Cache retrieval failed: ${(err as Error)?.message}`);
    }

    if (cached) 
       return cached;

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

    this.cache.set(barcode, result, 3600 * 1000).catch((err) =>
      this.logger.warn(`Cache write failed: ${err?.message}`),
  );

    return result;
  }

  private valorOrNull<T>(result: PromiseSettledResult<T>, nombre: string): T | null {
    if (result.status === 'fulfilled') 
      return result.value;
    // const reason: any = result.reason;
    // this.logger.warn(
    //   `Falló la carga de ${nombre}: ${reason?.message}`,
    //   JSON.stringify(reason?.body ?? reason?.response?.body ?? reason?.data ?? Object.keys(reason ?? {})),
    // );
    return null;
  }

  private map_product(response: any | null): ProductDetailsDto | null {
    const product = response?.data?.product;
    if (!product) return null;

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
    const data = response?.data;
    // this.logger.debug(`Places API response: ${JSON.stringify(data)}`);

    return (data?.places ?? []).map((place: any, i: number) => ({
      nombre: place.displayName?.text,
      distanciaMetros: data?.routingSummaries?.[i]?.legs?.[0]?.distanceMeters,
      googleMapsUri: place.googleMapsUri,
    }));
  }
}