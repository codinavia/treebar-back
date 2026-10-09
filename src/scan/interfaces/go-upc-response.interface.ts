export interface GoUpcResponse {
  code: string;
  codeType: string;
  product: {
    name: string;
    description?: string;
    imageUrl?: string;
    brand?: string;
    specs?: [string, string][];
    category?: string;
    categoryPath?: string[];
    ingredients?: { text: string };
    upc?: number;
    ean?: number;
  };
  barcodeUrl: string;
  inferred: boolean;
}