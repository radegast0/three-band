import { Canvas } from '@react-three/fiber';
import Drum from './Drum';
import { CameraControls, Environment, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import Guitar from './Guitar';
import Model from './Model';
import Orchestra from './Orchestra';
import Altar from './Altar';
import Lights from './Lights';

const Experience = () => {
  const environments = {
    'Studio Small': './studio_small_08_1k.hdr',
    'Vignaioli Night': './vignaioli_night_1k.hdr',
  } as const;

  type EnvironmentKey = keyof typeof environments;

  const { environment }: { environment: EnvironmentKey } = useControls({
    environment: { options: Object.keys(environments) as EnvironmentKey[] },
  });

  return (
    <div className="h-dvh w-dvw">
      <Canvas camera={{ position: [0, 4, 8], fov: 75 }}>
        {/* <color attach="background" args={["#0f0f0f"]} />
        <directionalLight intensity={1} position={[0, 5, 0]} />
        <Environment
          environmentIntensity={1}
          files={environments[environment]}
        />
        <OrbitControls />
        <Guitar position={[-4, 0, 0]} rotation={[0,0,Math.PI/2]} scale={.02} />
        <Guitar position={[0, 0, 0]} rotation={[0,0,Math.PI/2]} scale={.02} />
        <Guitar position={[4, 0, 0]} rotation={[0,0,Math.PI/2]} scale={.02} /> */}

        {/* <Environment environmentIntensity={0.2} files={environments[environment]} /> */}
        <OrbitControls />
        <Altar rotation={[0,-Math.PI/2,0]} />
        <Lights />
        {/* <Model scale={0.5} /> */}
        {/* <Orchestra /> */}
      </Canvas>
    </div>
  );
};

export default Experience;
