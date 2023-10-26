import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';

import { useProductContext } from '../contexts/AppContext';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';

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
          fov: 70,
          position: [3.5, 2.5, 6],
          quaternion: [0, 0, 0, 1],
          rotation: [0, 0, 0],
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
