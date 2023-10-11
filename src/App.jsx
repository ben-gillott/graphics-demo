import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Plane } from "@react-three/drei";
// import { shaderMaterial } from "@react-three/drei";
// import glsl from "babel-plugin-glsl/macro";

const BoxScene = () => {
  const boxRef = useRef();
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.001;
  });

  return (
    <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
      <meshStandardMaterial color={"orange"} />
    </Box>
  );
};

const PlaneScene = () => {
  const planeRef = useRef();

  return (
    <Plane ref={planeRef} args={[2.5, 2.5]}>
      <meshStandardMaterial color={"orange"} />
    </Plane>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <pointLight position={[10, 10, 10]} />
      <PlaneScene />
      {/* <BoxScene /> */}
    </Canvas>
  );
};

export default App;
