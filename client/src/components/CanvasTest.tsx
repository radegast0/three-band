import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, OrbitControls, Stats } from '@react-three/drei';
import Guitar from './Guitar';
import Lights from './Lights';
import Altar from './Altar';
import Vinyls from './Vinyls';
import Crow from './Crow';
import useUserStore from '@/store';
import { WebGPURenderer } from 'three/webgpu';
import { useEffect, useState } from 'react';

const CanvasTest = () => {
  const [isCrowVisible, setIsCrowVisible] = useState(true);
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);
  const [frameloop, setFrameloop] = useState<'never' | 'always' | 'demand'>('never');

  return (
    <Canvas
      shadows
      frameloop={frameloop}
      gl={(canvas) => {
        const renderer = new WebGPURenderer({
          canvas: canvas as HTMLCanvasElement,
          powerPreference: navigator.platform.startsWith('Win') ? undefined : 'high-performance',
          antialias: true,
          alpha: true,
        });
        renderer.init().then(() => setFrameloop('always'));
        return renderer;
      }}
      camera={{ position: [0, 4, 16], fov: 75 }}
    >
      <color attach="background" args={['#3D0301']} />

      <OrbitControls />
      <Altar position={[0, -2, 0]} scale={0.5} />
      <Lights />
      <Vinyls position={[0, -2, 0]} scale={0.5} />

      {/* tsl fog */}
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[100, 3, 100, 50, 2, 50]} />
        <meshBasicMaterial wireframe color="#3D0301" />
      </mesh>

      {/* <Crow position={[-3, 0.7, 4]} scale={1} /> */}

      {isSinglePlayer && <Guitar position={[0, 4, 4]} rotation={[0, 0, Math.PI / 2]} scale={0.02} />}
      {isCrowVisible && (
        <>
          <Crow position={[-3, 0.7, 4]} scale={1} onHide={() => setIsCrowVisible(false)} />
        </>
      )}
      <Stats />
    </Canvas>
  );
};

export default CanvasTest;
