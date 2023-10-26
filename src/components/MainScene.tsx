import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Suspense } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';

import { useProductContext } from '../contexts/AppContext';
import { Canvas } from '@react-three/fiber';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
  const { products } = useProductContext();

  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          position: [3.3, 2.5, 5.6],
          fov: 70,
          quaternion: [
            -0.0013015120050624478, 0.24311103747814175, 0.00032619869798407937,
            0.969997537686159,
          ],
        }}
        shadows
      >
        <axesHelper args={[10]} />
        <ambientLight />
        <pointLight
          position={[10, 8, 10]}
          intensity={100}
          color="#fff"
          castShadow
        />
        <Suspense fallback={<Loader />}>
          <Room />
          {products.map(product => (
            <ProductUniFi key={product.id} productInfo={product} />
          ))}
          <OrbitControls makeDefault />
          <Environment background={true} blur={0.5} preset={'sunset'} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default MainScene;
