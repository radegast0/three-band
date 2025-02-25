import { Suspense, useRef } from 'react';
import Guitar from './Guitar';
import Drum from './Drum';
import useUserStore from '@/store';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

const SelectScreen = () => {
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);
  const guitarRef = useRef<Group>(null);
  const drumRef = useRef<Group>(null);

  useFrame(() => {});

  return (
    <>
      <Suspense fallback={null}>
        {isSinglePlayer && (
          <>
            <group ref={guitarRef}>
              <Guitar position={[0, 10, 18]} rotation={[-Math.PI / 8, 0, Math.PI / 2]} scale={0.02} />
            </group>
            <group ref={drumRef}>
              <Drum rotation={[0,Math.PI/2,0]} />
            </group>
          </>
        )}
      </Suspense>
    </>
  );
};

export default SelectScreen;
