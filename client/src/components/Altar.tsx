/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import Lanterns from './Lanterns';

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial068: THREE.Mesh;
    defaultMaterial068_1: THREE.Mesh;
    defaultMaterial068_2: THREE.Mesh;
    defaultMaterial068_3: THREE.Mesh;
    defaultMaterial068_4: THREE.Mesh;
    defaultMaterial068_5: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    candle_flame2: THREE.MeshStandardMaterial;
    Main_part: THREE.MeshStandardMaterial;
    Pillars: THREE.MeshStandardMaterial;
    stepenice: THREE.MeshPhysicalMaterial;
    candle_chain: THREE.MeshStandardMaterial;
  };
};

export default function Altar(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./models/altar-merged.glb') as GLTFResult;
  return (
    <>
      <Lanterns />

      <group {...props} dispose={null}>
        <group position={[0.513, 11.464, -1.012]} rotation={[-0.451, 0.171, 0.106]} scale={2.979}>
          <mesh castShadow receiveShadow geometry={nodes.defaultMaterial068.geometry} material={materials.material} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial068_1.geometry}
            material={materials.candle_flame2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial068_2.geometry}
            material={materials.Main_part}
          />
          <mesh castShadow receiveShadow geometry={nodes.defaultMaterial068_3.geometry} material={materials.Pillars} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial068_4.geometry}
            material={materials.stepenice}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial068_5.geometry}
            material={materials.candle_chain}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('./models/altar-merged.glb');
