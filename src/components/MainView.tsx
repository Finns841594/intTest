import { Box, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MainView = () => {
  return (
    <>
      <Canvas
        style={{ width: 1280, height: 720 }}
        camera={{ position: [7, 7, 10] }}
        shadows
      >
        <ambientLight />
        <pointLight
          position={[10, 8, 10]}
          intensity={100}
          color="#fff"
          castShadow
        />
        <Box position={[0, 0, 0]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
};

export default MainView;
