import { useHelper } from '@react-three/drei';
import React from 'react';
import { useRef } from 'react';
import { PointLight, PointLightHelper } from 'three';

const Lights = () => {
  const pointLight = useRef<PointLight>(null!);
  const pointLight2 = useRef<PointLight>(null!);
  useHelper(pointLight, PointLightHelper, 0.3);
  useHelper(pointLight2, PointLightHelper, 0.3);
  return (
    <>
      <ambientLight intensity={0.5} />

      <pointLight ref={pointLight} position={[1.94, 2.3, 0.4]} intensity={10} color={'yellow'} />
      <pointLight ref={pointLight2} position={[-2.25, 2.8, -0.75]} intensity={10} color={'yellow'} />

      <directionalLight intensity={1} position={[0, 2, 5]} color={"yellow"} />

      <hemisphereLight intensity={2} />
    </>
  );
};

export default Lights;
