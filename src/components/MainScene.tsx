import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Suspense, useRef } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';

import { SceneContext, useProductContext } from '../contexts/AppContext';
import { Canvas } from '@react-three/fiber';
import { Scene } from 'three';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
  const { products } = useProductContext();
  const scene = useRef<Scene>(null);

  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [6, 8, 10], fov: 70 }}
        shadows
      >
        <SceneContext.Provider value={scene}>
          <scene ref={scene}>
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
          </scene>
        </SceneContext.Provider>
      </Canvas>
    </>
  );
};

export default MainScene;
