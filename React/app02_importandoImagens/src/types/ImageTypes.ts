export interface ImageModule {
  default: string; // A URL processada da imagem
}

export type ImageLoader = (() => Promise<ImageModule>) | (() => Promise<() => Promise<ImageModule>>)
/* A notação de tipo de função precisa estar entre parênteses quando usada em um tipo de união. */

export interface LoadedImage {
  nomeArquivo: string; 
  caminhoCompleto: string;
  url: string;
  carregadaComSucesso: boolean;
}

export interface ImageCatalog {
  [key: string]: string; // Mapeamento de nome do arquivo para URL
}

export interface ImageLoadResult {
  sucesso: boolean;
  totalImagens: number;
  imagensCarregadas: number;
  catalogo: ImageCatalog;
  erros: string[];
}