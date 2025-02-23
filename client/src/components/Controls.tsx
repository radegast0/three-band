import { OrbitControls, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import useUserStore from '@/store';

const Controls = () => {
  const controls = useRef<OrbitControlsImpl>(null);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { isSinglePlayer } = useUserStore();
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(0, 4, 16));
  const { progress } = useProgress();

  const isLoading = progress < 100;

  useEffect(() => {
    if (isSinglePlayer) {
      setTransitionComplete(false);
      setUserInteracted(false);
      setCameraPosition(new THREE.Vector3(0, 12, 24));

      if (controls.current) {
        controls.current.target.set(0, 0, 0);
        controls.current.update();
      }
    }

    const handleStart = () => setUserInteracted(true);
    controls.current?.addEventListener('start', handleStart);

    return () => {
      controls.current?.removeEventListener('start', handleStart);
    };
  }, [isSinglePlayer]);

  useFrame((state, delta) => {
    if (isLoading) return;

    if (controls.current && !transitionComplete && !userInteracted) {
      const targetPosition = cameraPosition;
      const currentPosition = state.camera.position;
      const speed = 2;
      const step = speed * delta;

      currentPosition.lerp(targetPosition, step);
      state.camera.lookAt(0, 0, 0);
      controls.current.update();

      if (currentPosition.distanceTo(targetPosition) < 0.1) {
        setTransitionComplete(true);
      }
    }
  });

  return <OrbitControls autoRotateSpeed={0.3} autoRotate={!isSinglePlayer && transitionComplete} ref={controls} />;
};

export default Controls;
