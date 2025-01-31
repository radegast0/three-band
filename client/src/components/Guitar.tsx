/*
Author: CamSear16 (https://sketchfab.com/CamSear16)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/guitar-hero-controller-bcac8f9f95a44008ad90f470326e5fca
Title: Guitar Hero Controller
*/

import { Group, MathUtils, Mesh, MeshStandardMaterial } from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import useUserStore from '@/store';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: Mesh;
    Key1Outer: Mesh;
    Key1Inner: Mesh;
    Key2Outer: Mesh;
    Key2Inner: Mesh;
    Key3Outer: Mesh;
    Key3Inner: Mesh;
    Key4Outer: Mesh;
    Key4Inner: Mesh;
    Key5Outer: Mesh;
    Key5Inner: Mesh;
  };
  materials: {
    Material__26: MeshStandardMaterial;
    ['Material.001']: MeshStandardMaterial;
  };
};

export default function Guitar(props: JSX.IntrinsicElements['group']) {
  const isSinglePlayer = useUserStore((state) => state.isSinglePlayer);
  const guitarRef = useRef<Group>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerDown = () => {
    setIsHovering(true);
  };
  const handlePointerOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '1' && event.key <= '5') {
        const keyIndex = Number(event.key) - 1;
        const keyName = keyNames[keyIndex] as KeyName;
        handleKeyPress(keyName);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { nodes, materials } = useGLTF('/untitled2.glb') as GLTFResult;

  const keyNames = ['Key1', 'Key2', 'Key3', 'Key4', 'Key5'] as const;
  type KeyName = (typeof keyNames)[number];

  const keyRefs: Record<KeyName, React.RefObject<Group>> = {
    Key1: useRef<Group>(null),
    Key2: useRef<Group>(null),
    Key3: useRef<Group>(null),
    Key4: useRef<Group>(null),
    Key5: useRef<Group>(null),
  };

  const keyPositions: Record<KeyName, [number, number, number]> = {
    Key1: [...nodes.Key1Inner.position.toArray()],
    Key2: [...nodes.Key2Inner.position.toArray()],
    Key3: [...nodes.Key3Inner.position.toArray()],
    Key4: [...nodes.Key4Inner.position.toArray()],
    Key5: [...nodes.Key5Inner.position.toArray()],
  };

  const [pressedKeys, setPressedKeys] = useState<Record<KeyName, boolean>>({
    Key1: false,
    Key2: false,
    Key3: false,
    Key4: false,
    Key5: false,
  });

  const handleKeyPress = (key: KeyName) => {
    setPressedKeys((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setPressedKeys((prev) => ({ ...prev, [key]: false }));
    }, 200);
  };

  useFrame((_state, delta) => {
    keyNames.forEach((key) => {
      const keyRef = keyRefs[key].current;
      if (keyRef) {
        const targetZ = pressedKeys[key] ? keyPositions[key][2] - 0.5 : keyPositions[key][2];
        keyRef.position.z = MathUtils.lerp(keyRef.position.z, targetZ, delta * 10);
        keyRef.rotation.x = MathUtils.lerp(keyRef.rotation.x, pressedKeys[key] ? -0.03 : 0, delta * 10);
      }
    });
  });

  return (
    <>
      <group {...props} ref={guitarRef} dispose={null}>
        <mesh
          onPointerEnter={handlePointerDown}
          onPointerLeave={handlePointerOut}
          geometry={nodes.Object_2.geometry}
          material={materials.Material__26}
        >
          {isHovering && <Outlines thickness={2} color={'white'} />}
        </mesh>
        {/* <mesh geometry={nodes.Object_3.geometry} material={materials.Material__26} /> */}
        {/* <mesh geometry={nodes.Object_4.geometry} material={materials.Material__26} /> */}

        {keyNames.map((key, index) => (
          <group key={key} ref={keyRefs[key]} position={keyPositions[key]}>
            <mesh
              name={`${key}Outer`}
              castShadow
              receiveShadow
              geometry={nodes[`${key}Outer`].geometry}
              onClick={() => handleKeyPress(key)}
            >
              <meshBasicMaterial color={['orange', 'blue', 'yellow', 'red', 'green'][index]} />
            </mesh>

            <mesh
              onClick={() => handleKeyPress(key)}
              name={`${key}Inner`}
              geometry={nodes[`${key}Inner`].geometry}
              material={materials['Material.001']}
            />
          </group>
        ))}
      </group>
    </>
  );
}

useGLTF.preload('/untitled2.glb');
