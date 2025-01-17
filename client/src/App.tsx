import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Cube from "./components/Cube";

export default function App() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [1, 2, 3] }}>
        <Environment preset="sunset" />
        <OrbitControls />
        <Cube />
        <Cube position = {[-2, 0, 0]} color="red" />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </div>
  );
}
