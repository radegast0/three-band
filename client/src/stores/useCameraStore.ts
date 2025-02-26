import { create } from 'zustand';
import { Vector3 } from 'three';

interface CameraState {
  cameraPosition: Vector3;
  cameraTarget: Vector3;
  moveCamera: (x: number, y: number, z: number) => void;
  moveTarget: (x: number, y: number, z: number) => void;
}

const useCameraStore = create<CameraState>((set) => ({
  cameraPosition: new Vector3(0, 0, 3),
  cameraTarget: new Vector3(0, 0, 0),
  moveCamera: (x: number, y: number, z: number) => {
    set({ cameraPosition: new Vector3(x, y, z) });
  },
  moveTarget: (x: number, y: number, z: number) => {
    set({ cameraTarget: new Vector3(x, y, z) });
  },
}));

export default useCameraStore;
