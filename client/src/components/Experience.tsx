import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import Guitar from './Guitar';
import Lights from './Lights';
import Altar from './Altar';
import Vinyls from './Vinyls';
import useUserStore from '@/store';
import Poster from './Poster';
import { Suspense } from 'react';

const Experience = () => {
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);

  return (
    <div className="h-dvh w-dvw">
      <Canvas camera={{ position: [0, 4, 16], fov: 75 }}>
        <color attach="background" args={['#3D0301']} />

        <OrbitControls />

        <Altar position={[0, -2, 0]} scale={0.5} />
        <Lights />
        <Vinyls position={[0, -2, 0]} scale={0.5} />
        <Poster position={[0, -2, 0]} scale={0.5} />

        {/* tsl fog */}
        <mesh position={[0, -2, 0]}>
          <boxGeometry args={[100, 3, 100, 50, 2, 50]} />
          <meshBasicMaterial wireframe color="#3D0301" />
        </mesh>

        {/* <Crow position={[-3, 0.7, 4]} scale={1} /> */}

        {isSinglePlayer && (
          <Suspense fallback={null}>
            <Guitar position={[0, 4, 4]} rotation={[0, 0, Math.PI / 2]} scale={0.02} />
          </Suspense>
        )}

        <Stats />
      </Canvas>
    </div>
  );
};

export default Experience;
