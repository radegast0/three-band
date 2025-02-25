import { Canvas } from '@react-three/fiber';
import { Loader, Stats } from '@react-three/drei';
import Lights from './Lights';
import Altar from './Altar';
import Vinyls from './Vinyls';
import Poster from './Poster';
import { Suspense } from 'react';
import Controls from './Controls';
import SelectScreen from './SelectScreen';

const Experience = () => {

  return (
    <div className="h-dvh w-dvw">
      <Loader />
      <Canvas camera={{ position: [0, 40, 40], fov: 75 }}>
        <color attach="background" args={['#3D0301']} />
        <Lights />
        <Controls />

        <SelectScreen />

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
