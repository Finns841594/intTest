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

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
  const { products } = useProductContext();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Room />
        {/* <ProductUniFi position={new Vector3(0, 0, 0)} /> */}
        {products &&
          products.map(product => (
            <ProductUniFi key={product.id} productInfo={product} />
          ))}
        <OrbitControls makeDefault />
        <Environment background={true} blur={0.5} preset={'sunset'} />
      </Suspense>
    </>
  );
};

export default MainScene;
