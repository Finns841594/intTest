import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
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
        <Suspense fallback={<Loader />}>
          <Room />
          <ProductUniFi />
        </Suspense>
        <OrbitControls makeDefault />
        <Environment background={true} blur={0.5} preset={'sunset'} />
      </Canvas>
    </>
  );
};

export default MainScene;
