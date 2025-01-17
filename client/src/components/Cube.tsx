import React from "react";

interface CubeProps {
  color?: string;
  position?: [number, number, number];
}

const Cube: React.FC<CubeProps> = ({
  color = "hotpink",
  position = [0, 0, 0],
}) => {
  return (
    <mesh castShadow position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cube;
