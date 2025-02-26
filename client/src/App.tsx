import { Canvas } from '@react-three/fiber';
import Controls from './Controls';
import Guitar from './components/Guitar';
import { Grid, Stats } from '@react-three/drei';
import Lights from './components/Lights';
// import useCameraStore from "./stores/useCameraStore";

// const MoveCameraButton = () => {
//   const moveCamera = useCameraStore((state) => state.moveCamera);
//   const moveTarget = useCameraStore((state) => state.moveTarget);

//   return (
//     <button
//       onClick={() => {
//         moveCamera(10, 10, 10);
//         moveTarget(-5, -5, -5);
//       }}
//     >
//       move
//     </button>
//   );
// };

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 100, 100], fov: 75, near: 0.01 }}>
        <color attach="background" args={['#3D0301']} />
        <Controls />
        <Guitar />
        {/* <Grid args={[10, 10]} /> */}
        <Stats />
        <Lights />
      </Canvas>
      {/* <MoveCameraButton /> */}
    </>
  );
}

export default App;
