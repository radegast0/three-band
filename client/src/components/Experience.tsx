import { Canvas } from "@react-three/fiber";
import Drum from "./Drum";
import { Environment, OrbitControls } from "@react-three/drei";

const Experience = () => {
  return (
    <div className="h-dvh w-dvw">
      <Canvas camera={{ position: [0, 3, 5] }}>
        <color attach="background" args={["#0f0f0f"]} />
        <directionalLight intensity={1} position={[0,5,0]} />
        <Environment
          environmentIntensity={1}
          files={"./vignaioli_night_1k.hdr"}
        />
        <OrbitControls />
        <Drum
          position={[-4, 0, 0]}
          rotation={[0, -Math.PI, 0]}
          scale={0.0025}
        />
      </Canvas>
    </div>
  );
};

export default Experience;
