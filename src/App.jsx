import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Plane, shaderMaterial } from "@react-three/drei";
// import glsl from "babel-plugin-glsl/macro";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
);
extend({ ColorShiftMaterial });

const TestMaterial = () => {
  const matRef = useRef();
  useFrame((state, delta) => {
    matRef.current.time += 0.03;
  });

  return <colorShiftMaterial ref={matRef} color='hotpink' time={0} />;
};

const BoxScene = props => {
  const boxRef = useRef();
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.002;
    boxRef.current.time += 0.001;
  });

  return (
    <Box position={props.position} ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
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
      {/* <PlaneScene /> */}
      <BoxScene position={[1, 0, 0]} />
    </Canvas>
  );
};

export default App;
