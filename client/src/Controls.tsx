import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useCameraStore from "./stores/useCameraStore";

const Controls = () => {
  const cameraControls = useRef<CameraControls>(null);
  const cameraPosition = useCameraStore((state) => state.cameraPosition);
  const cameraTarget = useCameraStore((state) => state.cameraTarget);

  useEffect(() => {
    if (cameraControls.current) {
      cameraControls.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        cameraTarget.x,
        cameraTarget.y,
        cameraTarget.z,
        true
      );
    }
  }, [cameraPosition, cameraTarget]);

  return <CameraControls draggingSmoothTime={0.1} ref={cameraControls} />;
};

export default Controls;
