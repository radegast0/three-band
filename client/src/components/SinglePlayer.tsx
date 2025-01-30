import { Canvas } from '@react-three/fiber';
import Guitar from './Guitar';
import { Environment, OrbitControls } from '@react-three/drei';

const SinglePlayer = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-dvh w-dvw">
      <Canvas camera={{ position: [-4, 2, 8] }}>
        <OrbitControls />
        <Environment files={['./studio_small_08_1k.hdr']} />
        <Guitar position={[0, 0, 0]} scale={0.05} />
      </Canvas>
    </div>
  );
};

export default SinglePlayer;
