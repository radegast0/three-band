import { Canvas } from "@react-three/fiber";
import Drum from "./Drum";
import { Environment, OrbitControls } from "@react-three/drei";
import Guitar from "./Guitar";
import { useControls } from "leva";

const Experience = () => {
  const environments = {
    "Studio Small": "./studio_small_08_1k.hdr",
    "Vignaioli Night": "./vignaioli_night_1k.hdr",
  } as const;

  type EnvironmentKey = keyof typeof environments;

  const { environment }: { environment: EnvironmentKey } = useControls({
    environment: { options: Object.keys(environments) as EnvironmentKey[] },
  });

  return (
    <div className="h-dvh w-dvw">
      <Canvas camera={{ position: [0, 3, 5] }}>
        <color attach="background" args={["#0f0f0f"]} />
        <directionalLight intensity={1} position={[0, 5, 0]} />
        <Environment
          environmentIntensity={1}
          files={environments[environment]}
        />
        <OrbitControls />
        {/* <Drum
          position={[-4, 0, 0]}
          rotation={[0, -Math.PI, 0]}
          scale={0.0025}
        /> */}
        <Guitar position={[0, 0, 0]} scale={10} />
      </Canvas>
    </div>
  );
};

export default Experience;
