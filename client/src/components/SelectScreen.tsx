import { Suspense } from 'react';
import Guitar from './Guitar';
import Drum from './Drum';
import useUserStore from '@/store';

const SelectScreen = () => {
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);

  return (
    <>
      <Suspense fallback={null}>
        {isSinglePlayer && (
          <>
            <Guitar position={[0, 10, 18]} rotation={[-Math.PI / 8, 0, Math.PI / 2]} scale={0.02} />
            <Drum scale={0.5} />
          </>
        )}
      </Suspense>
    </>
  );
};

export default SelectScreen;
