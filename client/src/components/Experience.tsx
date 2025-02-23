import { Canvas } from '@react-three/fiber';
import { Float, Loader, Stats } from '@react-three/drei';
import Guitar from './Guitar';
import Lights from './Lights';
import Altar from './Altar';
import Vinyls from './Vinyls';
import useUserStore from '@/store';
import Poster from './Poster';
import { Suspense } from 'react';
import Controls from './Controls';

const Experience = () => {
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);

  return (
    <div className="h-dvh w-dvw">
      <Loader />
      <Canvas camera={{ position: [0, 40, 40], fov: 75 }}>
        <color attach="background" args={['#3D0301']} />
        <Lights />
        <Controls />

        <Suspense fallback={null}>
          {isSinglePlayer && <Guitar position={[0, 10, 18]} rotation={[-Math.PI / 8, 0, Math.PI / 2]} scale={0.02} />}
        </Suspense>

        <Suspense fallback={null}>
          <group position={[0, -2, 0]} scale={0.5}>
            <Altar />
            <Vinyls />
            <Poster />
          </group>
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
};

export default Experience;
