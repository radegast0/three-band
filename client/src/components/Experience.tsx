import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import Guitar from './Guitar';
import Lights from './Lights';
import Altar from './Altar';

const Experience = () => {
  return (
    <div className="h-dvh w-dvw">
      <Canvas camera={{ position: [0, 4, 16], fov: 75 }}>
        <color attach="background" args={['#3D0301']} />
        <Guitar position={[0, 4, 4]} rotation={[0, 0, Math.PI / 2]} scale={0.02} />
        <OrbitControls />
        <Altar position={[0, -2, 0]} scale={0.5} />
        <Lights />
        <Stats />
      </Canvas>
    </div>
  );
};

export default Experience;
