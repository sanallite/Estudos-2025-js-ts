import { useState, useCallback } from 'react';
import type { ImageCatalog, LoadedImage, ImageLoadResult, ImageModule, ImageLoader } from '../types/ImageTypes';

/**
 * Hook personalizado para gerenciar carregamento de imagens
 * Este hook encapsula toda a lógica de carregamento e fornece um estado limpo para o componente
 */
export const useImageLoader = () => {
  const [imageState, setImageState] = useState<ImageLoadResult>({
    sucesso: false,
    totalImagens: 0,
    imagensCarregadas: 0,
    catalogo: {},
    erros: []
  });
  
  const [carregando, setCarregando] = useState<boolean>(false);

  /**
   * Função auxiliar para extrair nome do arquivo de um caminho
   * Tratamos explicitamente o caso undefined que o TypeScript detectou
   */
  const extrairNomeArquivo = useCallback((caminhoCompleto: string): string => {
    const partesoCaminho = caminhoCompleto.split('/');
    const ultimaParte = partesoCaminho[partesoCaminho.length - 1];
    
    // Removemos a parte '../imagens/' do início se existir
    return ultimaParte || 'arquivo-desconhecido';
  }, []);

  // Função auxiliar que normaliza os diferentes tipos do modulo de imagem retornado pelo import.meta.glob, devido a assinaturas de índice incompatíveis.
  const resolverModuloImagem = async (carregador: ImageLoader): Promise<ImageModule> => {
    try {
        // Primeiro, executamos o carregador
        const resultado = await carregador();
        
        // Agora verificamos: o resultado é um módulo de imagem ou uma função.
        if (typeof resultado === 'function') {
            // Se é uma função, precisamos chamá-la novamente
            return await resultado();
        } else if (resultado && typeof resultado === 'object' && 'default' in resultado) {
            // Se é um objeto com a propriedade 'default', é nosso ModuloImagem
            return resultado;
        } else {
            // Caso não esperado - criamos um fallback seguro
            throw new Error('Formato de módulo não reconhecido');
        }
    } catch (erro) {
        console.error('Erro ao resolver módulo de imagem:', erro);
        // Retornamos um módulo "vazio" para manter a aplicação funcionando
        return { default: '' };
    }
  }

  /**
   * Função principal para descobrir e carregar imagens
   * Esta é uma versão melhorada que trata explicitamente todos os casos de tipo
   */
  const descobrirECarregarImagens = useCallback(async (): Promise<ImageLoadResult> => {
    console.log('🎯 Iniciando descoberta de imagens...');
    
    try {
      setCarregando(true);
      
      // Usando glob import para descobrir todas as imagens
      // O tipo aqui é Record<string, () => Promise<any>> O any é usado para flexibilidade, com a normalização dos tipos sendo feita pela função auxiliar.
      const modulosDeImagem: Record<string, () => Promise<any>> = 
        import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp}');
      
      console.log(`📁 Encontradas ${Object.keys(modulosDeImagem).length} imagens para carregar`);
      
      if (Object.keys(modulosDeImagem).length === 0) {
        console.warn('⚠️ Nenhuma imagem encontrada no padrão especificado');
        return {
          sucesso: true,
          totalImagens: 0,
          imagensCarregadas: 0,
          catalogo: {},
          erros: ['Nenhuma imagem encontrada']
        };
      }

      // Convertemos o objeto em um array de promessas para processamento paralelo
      const promessasDeCarregamento = Object.entries(modulosDeImagem).map(
        async ([caminhoCompleto, carregadorModulo]): Promise<LoadedImage> => {
          try {
            console.log(`🔄 Carregando: ${caminhoCompleto}`);
            
            // Aqui fazemos a chamada assíncrona para carregar o módulo
            const modulo: ImageModule = await resolverModuloImagem(carregadorModulo);
            const nomeArquivo = extrairNomeArquivo(caminhoCompleto);

            // Verificamos se realmente obtivemos uma URL válida
            if (!modulo.default || modulo.default.trim() === '') {
                throw new Error('URL de imagem vazia ou inválida');
            }
            
            console.log(`✅ Sucesso: ${nomeArquivo} -> ${modulo.default.substring(0, 50)}...`);
            
            return {
              nomeArquivo, // Agora garantidamente string, não undefined
              caminhoCompleto,
              url: modulo.default,
              carregadaComSucesso: true
            };
            
          } catch (erro) {
            const nomeArquivo = extrairNomeArquivo(caminhoCompleto);
            console.error(`❌ Erro ao carregar ${nomeArquivo}:`, erro);
            
            return {
              nomeArquivo,
              caminhoCompleto,
              url: '',
              carregadaComSucesso: false
            };
          }
        }
      );

      // Aguardamos todas as promessas em paralelo para máxima eficiência
      const resultadosCarregamento = await Promise.all(promessasDeCarregamento);
      
      // Agora construímos nosso catálogo final, filtrando apenas sucessos
      const imagensSucesso = resultadosCarregamento.filter(img => img.carregadaComSucesso);
      const imagensErro = resultadosCarregamento.filter(img => !img.carregadaComSucesso);
      
      // Construindo o catálogo de forma type-safe
      const catalogo: ImageCatalog = {};
      imagensSucesso.forEach(imagem => {
        // Agora o TypeScript sabe que nomeArquivo é definitivamente string
        catalogo[imagem.nomeArquivo] = imagem.url;
      });

      const resultado: ImageLoadResult = {
        sucesso: imagensErro.length === 0,
        totalImagens: resultadosCarregamento.length,
        imagensCarregadas: imagensSucesso.length,
        catalogo,
        erros: imagensErro.map(img => `Falha ao carregar: ${img.nomeArquivo}`)
      };
      
      console.log('🎉 Carregamento concluído:', resultado);
      return resultado;
      
    } catch (erro) {
      console.error('💥 Erro crítico no carregamento de imagens:', erro);
      return {
        sucesso: false,
        totalImagens: 0,
        imagensCarregadas: 0,
        catalogo: {},
        erros: [erro instanceof Error ? erro.message : 'Erro desconhecido']
      };
    } finally {
      setCarregando(false);
    }
  }, [extrairNomeArquivo]);

  /**
   * Função para inicializar o carregamento
   * Usamos useCallback para evitar re-criações desnecessárias
   */
  const iniciarCarregamento = useCallback(() => {
    // Esta é a forma correta de lidar com Promises em useEffect
    descobrirECarregarImagens().then(resultado => {
      setImageState(resultado);
    }).catch(erro => {
      console.error('Erro no carregamento:', erro);
      setImageState(prev => ({
        ...prev,
        erros: [...prev.erros, 'Falha na inicialização do carregamento']
      }));
    });
  }, [descobrirECarregarImagens]);

  // Retornamos um objeto com tudo que o componente precisa
  return {
    imageState,
    carregando,
    iniciarCarregamento,
    // Função de conveniência para buscar uma imagem específica
    obterImagem: useCallback((nomeArquivo: string): string | undefined => {
      return imageState.catalogo[nomeArquivo];
    }, [imageState.catalogo]),
    // Função para verificar se uma imagem existe
    imagemExiste: useCallback((nomeArquivo: string): boolean => {
      return nomeArquivo in imageState.catalogo;
    }, [imageState.catalogo])
  };
};