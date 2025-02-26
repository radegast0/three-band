// import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { PointLight} from 'three';

const Lights = () => {
  const pointLight = useRef<PointLight>(null!);
  const pointLight2 = useRef<PointLight>(null!);
  // useHelper(pointLight, PointLightHelper, 0.3);
  // useHelper(pointLight2, PointLightHelper, 0.3);

  return (
    <>
      {/* <ambientLight intensity={.5} /> */}

      <pointLight ref={pointLight} position={[2.6, 2.1, 1.6]} intensity={50} color={'#F9CB43'} />
      <pointLight ref={pointLight2} position={[-3.6, 3.6, 1.1]} intensity={50} color={'#F9CB43'} />

      <directionalLight intensity={2} position={[0, 2, 5]} color={'red'} />
      <directionalLight intensity={1} position={[0, 10, -1]} color={'white'} />
      <directionalLight intensity={1} position={[0, 1, 5]} color={'white'} />

      {/* <hemisphereLight intensity={2} /> */}
    </>
  );
};

export default Lights;
