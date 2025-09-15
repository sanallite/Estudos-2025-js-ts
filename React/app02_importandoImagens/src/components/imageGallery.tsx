import React, { useEffect } from 'react';
import { useImageLoader } from '../hooks/useImageLoader';

interface ImageGalleryProps {
  autoLoad?: boolean; // Se deve carregar automaticamente ao montar
  className?: string;
}

/**
 * Componente de galeria que demonstra o uso do hook
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  autoLoad = true, 
  className = 'image-gallery' 
}) => {
  const { 
    imageState, 
    carregando, 
    iniciarCarregamento, 
    /* obterImagem, 
    imagemExiste 
    Funções não utilizadas atualmente */
  } = useImageLoader();

  // Este é o useEffect correto - não retorna Promise
  useEffect(() => {
    if (autoLoad) {
      console.log('🚀 Iniciando carregamento automático de imagens');
      iniciarCarregamento(); // Esta função já trata a Promise internamente
    }
  }, [autoLoad, iniciarCarregamento]); // Dependências claras e corretas

  // Função para renderizar uma imagem individual
  const renderizarImagem = (nomeArquivo: string, url: string) => (
    <div key={nomeArquivo} className="image-item">
      <img 
        src={url} 
        alt={nomeArquivo}
        loading="lazy" // Otimização de performance
        onLoad={() => console.log(`🖼️ Imagem renderizada: ${nomeArquivo}`)}
        onError={() => console.error(`❌ Erro na renderização: ${nomeArquivo}`)}
        style={{ 
          maxWidth: '200px', 
          maxHeight: '200px', 
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
      <p style={{ fontSize: '12px', marginTop: '4px', textAlign: 'center' }}>
        {nomeArquivo}
      </p>
    </div>
  );

  if (carregando) {
    return (
      <div className={className}>
        <p>🔄 Carregando imagens...</p>
        <div style={{ 
          width: '100px', 
          height: '4px', 
          backgroundColor: '#e0e0e0',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '30%',
            height: '100%',
            backgroundColor: '#4CAF50',
            animation: 'loading 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  if (!imageState.sucesso && imageState.erros.length > 0) {
    return (
      <div className={className}>
        <h3>⚠️ Problemas no carregamento</h3>
        <p>Total encontrado: {imageState.totalImagens}</p>
        <p>Carregadas com sucesso: {imageState.imagensCarregadas}</p>
        <details>
          <summary>Ver erros ({imageState.erros.length})</summary>
          <ul>
            {imageState.erros.map((erro, index) => (
              <li key={index} style={{ color: 'red', fontSize: '12px' }}>
                {erro}
              </li>
            ))}
          </ul>
        </details>
        <button onClick={iniciarCarregamento} style={{ marginTop: '10px' }}>
          🔄 Tentar novamente
        </button>
      </div>
    );
  }

  const imagensDisponiveis = Object.entries(imageState.catalogo);

  if (imagensDisponiveis.length === 0) {
    return (
      <div className={className}>
        <p>📁 Nenhuma imagem encontrada</p>
        <p>Certifique-se de que há imagens na pasta '../assets/'</p>
        <button onClick={iniciarCarregamento}>
          🔍 Procurar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div style={{ marginBottom: '20px' }}>
        <h3>🖼️ Galeria de Imagens</h3>
        <p>
          Carregadas: {imageState.imagensCarregadas} de {imageState.totalImagens}
          {imageState.erros.length > 0 && (
            <span style={{ color: 'orange', marginLeft: '10px' }}>
              ({imageState.erros.length} com problemas)
            </span>
          )}
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        padding: '16px'
      }}>
        {imagensDisponiveis.map(([nomeArquivo, url]) => 
          renderizarImagem(nomeArquivo, url)
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={iniciarCarregamento}>
          🔄 Recarregar imagens
        </button>
      </div>
    </div>
  );
};