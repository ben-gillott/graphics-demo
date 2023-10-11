import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";

const Scene = () => {
  const boxRef = useRef();
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.001;
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
        <meshStandardMaterial color={"orange"} />
      </Box>
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
