import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { MouseEventHandler, Suspense, useState } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';
import { Product } from '../types/innerTypes';
import { Vector3 } from 'three';
import { getWorldCoords } from '../utils/threeJsTools';
import { useProductContext } from '../contexts/AppContext';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
  const { isAttached, setIsAttached, setProductPosition } = useProductContext();
  const [products, setProducts] = useState<Product[]>();
  const { camera, scene, gl } = useThree();

  // const onClick = (event: MouseEvent) => {
  //   const worldCoords = getWorldCoords(
  //     event.clientX,
  //     event.clientY,
  //     camera,
  //     scene,
  //     gl
  //   );
  //   console.log('a click');

  //   if (worldCoords && !isAttached) {
  //     // setProductPos(worldCoords);
  //     console.log(worldCoords);
  //     setProductPosition(worldCoords);
  //     setIsAttached(true);
  //   }
  // };

  // gl.domElement.addEventListener('click', onClick);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Room />
        <ProductUniFi position={new Vector3(0, 0, 0)} />
        <OrbitControls makeDefault />
        <Environment background={true} blur={0.5} preset={'sunset'} />
      </Suspense>
    </>
  );
};

export default MainScene;
