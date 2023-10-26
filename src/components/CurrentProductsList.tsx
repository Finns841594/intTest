import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { useProductContext } from '../contexts/AppContext';
import ProductInfoCard from './ProductInfoCard';
import SmallCanvas from './SmallCanvas';
import { useRef } from 'react';

const CurrentProductsList = () => {
  const { products } = useProductContext();
  const cameraRef1 = useRef<PerspectiveCamera>(null);
  return (
    <>
      <div>
        {products.length > 0 &&
          products.map(product => (
            <ProductInfoCard key={product.id} productInfo={product} />
          ))}
      </div>
      <p>test</p>
    </>
  );
};

export default CurrentProductsList;
