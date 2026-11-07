import { 
  Inject, 
  Injectable,
  Logger
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
import { Drizzle } from '../database/database.service.js';
import { producto } from '../database/schema.js';
import { eq } from 'drizzle-orm';

const REPAIR_RADIUS_METERS = 500;
const REPAIR_MAX_RESULTS = 5;
const PLACES_FIELD_MASK = [
  'places.displayName',
  'routingSummaries.legs.distanceMeters',
  'places.googleMapsUri' ,
  'places.primaryTypeDisplayName'
].join(',');

const ETIQUETAS: Record<string, string> = {
  // Construcción y diseño
  Build: 'Materiales',
  'Build Quality': 'Calidad de construcción',
  Body: 'Cuerpo',
  Frame: 'Estructura',
  Chassis: 'Chasis',
  Finish: 'Acabado',
  Form: 'Formato',
  'Form Factor': 'Formato',
  Dimensions: 'Dimensiones',
  Footprint: 'Superficie ocupada',
  Thickness: 'Grosor',
  Depth: 'Profundidad',
  Weight: 'Peso',
  Color: 'Color',
  Colour: 'Color',
  Material: 'Material',
  Cover: 'Cubierta',
  Case: 'Carcasa',
  Hinge: 'Bisagra',
  Bezel: 'Bisel',
  Bezels: 'Biseles',
  Lid: 'Tapa',

  // Pantalla
  Display: 'Pantalla',
  Screen: 'Pantalla',
  'Screen Size': 'Tamaño de pantalla',
  'Display Type': 'Tipo de pantalla',
  Panel: 'Tipo de panel',
  'Panel Type': 'Tipo de panel',
  Resolution: 'Resolución',
  'Refresh Rate': 'Tasa de refresco',
  Brightness: 'Brillo',
  Touchscreen: 'Pantalla táctil',
  'Aspect Ratio': 'Relación de aspecto',
  'Pixel Density': 'Densidad de píxeles',
  Glass: 'Cristal',
  Coating: 'Recubrimiento',
  'Screen to Body': 'Relación pantalla-cuerpo',

  // Rendimiento
  Processor: 'Procesador',
  CPU: 'Procesador',
  GPU: 'Tarjeta gráfica',
  Graphics: 'Gráficos',
  Chipset: 'Chipset',
  Cores: 'Núcleos',
  Threads: 'Hilos',
  'Clock Speed': 'Velocidad de reloj',
  'Base Clock': 'Frecuencia base',
  'Boost Clock': 'Frecuencia máxima',
  Cache: 'Memoria caché',
  Memory: 'Memoria RAM',
  RAM: 'Memoria RAM',
  Storage: 'Almacenamiento',
  'Storage Type': 'Tipo de almacenamiento',
  Drive: 'Unidad de almacenamiento',
  'Hard Drive': 'Disco duro',
  SSD: 'SSD',
  Expandable: 'Ampliable',
  Expansion: 'Expansión',
  Performance: 'Rendimiento',
  Benchmark: 'Prueba de rendimiento',
  Cooling: 'Enfriamiento',
  Fan: 'Ventilador',
  Thermal: 'Térmico',

  // Batería y carga
  Battery: 'Batería',
  'Battery Life': 'Duración de la batería',
  'Battery Capacity': 'Capacidad de la batería',
  Charging: 'Carga',
  'Fast Charging': 'Carga rápida',
  'Wireless Charging': 'Carga inalámbrica',
  Charger: 'Cargador',
  Adapter: 'Adaptador',
  'Power Adapter': 'Adaptador de corriente',
  Power: 'Alimentación',
  Wattage: 'Potencia',
  Voltage: 'Voltaje',
  Runtime: 'Autonomía',
  Standby: 'En espera',

  // Cámara y audio
  Camera: 'Cámara',
  'Rear Camera': 'Cámara trasera',
  'Front Camera': 'Cámara frontal',
  Webcam: 'Cámara web',
  Lens: 'Lente',
  Aperture: 'Apertura',
  Zoom: 'Zoom',
  Flash: 'Flash',
  Video: 'Video',
  'Video Recording': 'Grabación de video',
  Speakers: 'Bocinas',
  Audio: 'Audio',
  Microphone: 'Micrófono',
  'Headphone Jack': 'Entrada de audífonos',
  Sound: 'Sonido',
  Single: 'Individual',

  // Conectividad
  Connectivity: 'Conectividad',
  Ports: 'Puertos',
  Port: 'Puerto',
  Network: 'Red',
  Wireless: 'Conexión inalámbrica',
  'Wi-Fi': 'Wi-Fi',
  WiFi: 'Wi-Fi',
  Bluetooth: 'Bluetooth',
  Cellular: 'Red celular',
  SIM: 'Tarjeta SIM',
  'SIM Card': 'Tarjeta SIM',
  'Dual SIM': 'Doble SIM',
  NFC: 'NFC',
  GPS: 'GPS',
  Ethernet: 'Ethernet',
  HDMI: 'HDMI',
  'USB Ports': 'Puertos USB',
  Thunderbolt: 'Thunderbolt',
  'Card Reader': 'Lector de tarjetas',
  'Memory Card': 'Tarjeta de memoria',

  // Software y seguridad
  OS: 'Sistema operativo',
  'Operating System': 'Sistema operativo',
  Software: 'Software',
  Firmware: 'Firmware',
  Version: 'Versión',
  Security: 'Seguridad',
  Fingerprint: 'Lector de huella',
  'Face Unlock': 'Desbloqueo facial',
  Sensors: 'Sensores',
  Biometrics: 'Biometría',

  // Teclado y entrada
  Keyboard: 'Teclado',
  Backlit: 'Retroiluminado',
  Trackpad: 'Panel táctil',
  Touchpad: 'Panel táctil',
  Stylus: 'Lápiz óptico',
  Pen: 'Lápiz',
  Layout: 'Distribución del teclado',

  // Resistencia
  Durability: 'Durabilidad',
  Rating: 'Clasificación',
  'IP Rating': 'Resistencia al agua y polvo (IP)',
  'Water Resistance': 'Resistencia al agua',
  Waterproof: 'Resistente al agua',
  Rugged: 'Reforzado',
  Certification: 'Certificación',
  Certifications: 'Certificaciones',
  Warranty: 'Garantía',

  // Información general
  Brand: 'Marca',
  Manufacturer: 'Fabricante',
  Model: 'Modelo',
  'Model Number': 'Número de modelo',
  'Part Number': 'Número de parte',
  MPN: 'Número de parte',
  SKU: 'SKU',
  Series: 'Serie',
  Edition: 'Edición',
  Release: 'Lanzamiento',
  'Release Date': 'Fecha de lanzamiento',
  Released: 'Lanzamiento',
  Announced: 'Anunciado',
  Status: 'Estado',
  Condition: 'Condición',
  Features: 'Características',
  Specs: 'Especificaciones',
  Specifications: 'Especificaciones',
  Type: 'Tipo',
  Category: 'Categoría',
  Department: 'Departamento',
  Commodity: 'Tipo de producto',
  Capacity: 'Capacidad',
  Included: 'Incluido',
  'In the Box': 'Contenido de la caja',
  Accessories: 'Accesorios',
  Packaging: 'Empaque',
  Origin: 'País de origen',
  'Country of Origin': 'País de origen',
  Organic: 'Orgánico',
  'Non-GMO': 'Sin transgénicos',
  Allergens: 'Alérgenos',
  Length: 'Largo',
  Width: 'Ancho',
  Height: 'Alto',
};

@Injectable()
export class ScanService {
  private readonly logger = new Logger(ScanService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectHttpClient('places') private readonly places: HttpClient,
    @InjectHttpClient('translate') private readonly translateClient: HttpClient,
    @InjectHttpClient('upc') private readonly upc: HttpClient,
    private readonly reviewsService: ReviewsService,
    private readonly drizzle: Drizzle
  ) {}

  async aggregate (
    barcode: string,
    ubicacion: LocationDto,
  ): Promise<ScanResponseDto> {
    
    let cached: ProductDetailsDto | undefined;
    try {
      cached = await this.cache.get<ProductDetailsDto>(barcode);
    } catch (err) {
      // this.logger.warn(`Cache retrieval failed: ${(err as Error)?.message}`);
    }

    const [p, reparaciones, reseñas] = await Promise.allSettled([
      cached ? Promise.resolve(null) : this.getProductInfo(barcode),
      this.searchNearbyPlaces(ubicacion),
      this.reviewsService.findAllByTypeOfCriteria(barcode, 'USO'),
    ]);

    try {
      const producto =
        cached ?? (
          await this.translate_product(
            await this.map_product(
              this.valor_or_null(p, 'producto')
            )
          )
        );

      const result = {
        producto,
        reparaciones: this.map_places(this.valor_or_null(reparaciones, 'reparaciones')),
        reseñas: this.valor_or_null(reseñas, 'reseñas') ?? [],
      };

      const UN_DIA = 24 * 3600 * 1000;

      if (producto && !cached) {
        if (!(await this.exists(barcode))) await this.create(barcode);

        try {
          await this.cache.set(barcode, producto, 7 * UN_DIA);
        } catch (err) {
          // this.logger.warn(`Cache write failed: ${(err as Error)?.message}`);
        }
      }

      return result;
    } catch (err) {
      // this.logger.error('Fallo al armar la respuesta', (err as Error)?.stack);
      throw err;
    }
  }

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

  private async translate(
    text: string[]
  ): Promise<string[]> {
    if (text.length === 0) return text;

    const body = {
      q: text,
      target: 'es',
      format: 'text',
    };

    try {
      const response = await this.translateClient.post<Response>('', {
        json: body
      });

      if (response.ok) {
        const body = response.data as
          | { data?: { translations?: Array<{ translatedText: string }> } }
          | undefined;

        const traducidos = body?.data?.translations?.map((t) => t.translatedText);

        if (traducidos && traducidos.length === text.length) 
          return traducidos;
      }
      return text;
    } catch (err) {
      this.logger.warn(`Translation failed: ${(err as Error)?.message}`);
      return text;
    }
  }

  private async translate_product(
    producto: ProductDetailsDto | null,
  ): Promise<ProductDetailsDto | null> {
    if (!producto) return null;

    const specs 
      = Object.entries(producto.especificaciones ?? {});

    // No se traducen medidas ni números ("4.0 In", "16 GB")
    const esMedida = (v: string) => /^[\d.,\s]+[a-zA-Z"']{0,3}$/.test(v.trim());

    const translate = new Set<string>();
    if (producto.descripcion) 
      translate.add(producto.descripcion);
    
    if (producto.categoria) 
      translate.add(producto.categoria);
    
    for (const [k, v] of specs) {
      if (!ETIQUETAS[k]) translate.add(k);
      if (!esMedida(v)) translate.add(v);
    }

    const lista = [...translate];
    const t = await this.translate(lista);

    // texto original -> texto traducido
    const mapa = new Map(lista.map((s, i) => [s, t[i] ?? s]));
    const g = (s: string) => mapa.get(s) ?? s;

    return {
      ...producto,
      descripcion: producto.descripcion ? g(producto.descripcion) : producto.descripcion,
      categoria: producto.categoria ? g(producto.categoria) : producto.categoria,
      especificaciones: Object.fromEntries(
        specs.map(([k, v]) => [ETIQUETAS[k] ?? g(k), esMedida(v) ? v : g(v)]),
      ),
    };
  }

  async create (codigo_producto: string) {
    await this.drizzle.db
      .insert(producto)
      .values({ codigo: codigo_producto });
  }

  async exists (codigo_producto: string): Promise<boolean> {
    const result = await this.drizzle.db
      .select()
      .from(producto)
      .where(eq(producto.codigo, codigo_producto))
      .limit(1);

    return result.length > 0;
  }

  private valor_or_null<T>(result: PromiseSettledResult<T>, nombre: string): T | null {
    if (result.status === 'fulfilled') 
      return result.value;
    // const reason: any = result.reason;
    // this.logger.warn(
    //   `Falló la carga de ${nombre}: ${reason?.message}`,
    //   JSON.stringify(reason?.body ?? reason?.response?.body ?? reason?.data ?? Object.keys(reason ?? {})),
    // );
    return null;
  }

  private async map_product(
    response: any | null,
  ): Promise<ProductDetailsDto | null> {
    const product = response?.data?.product;
    if (!product) return null;

    return ({
      nombre: product.name,
      marca: product.brand,
      descripcion: product.description,
      imagenUrl: product.imageUrl,
      categoria: product.category,
      especificaciones: product.specs ? Object.fromEntries(product.specs) : undefined,
      inferido: response.inferred,
    });
  }

  private map_places(response: any | null): RepairPlaceDto[] {
    const data = response?.data;
    //this.logger.debug(`Places API response: ${JSON.stringify(data)}`);

    return (data?.places ?? []).map((place: any, i: number) => ({
      nombre: place.displayName?.text,
      distanciaMetros: data?.routingSummaries?.[i]?.legs?.[0]?.distanceMeters,
      googleMapsUri: place.googleMapsUri,
      tipo: place.primaryTypeDisplayName?.text ?? 'Reparación',
    }));
  }
}
