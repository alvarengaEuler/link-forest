import { ImageResponse } from 'next/og';

export const alt = 'Vetur Imagem';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#205b86',
        }}
      >
        Vetur Imagem | Dra. Ingrid Felix
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
