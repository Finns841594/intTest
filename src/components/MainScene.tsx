import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import Room from './Room';
import ProductUniFi from './ProductUniFi';
import { Object3D, Vector2 } from 'three';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const MainScene = () => {
  const wallGroupRef = useRef<Object3D | null>(null);
  const floorGroupRef = useRef<Object3D | null>(null);
  const productRef = useRef<Object3D | null>(null);
  const { raycaster, camera, scene, gl } = useThree();
  const [mouse, setMouse] = useState(new Vector2());

  const specificHeight = 2;

  useFrame(() => {
    if (productRef.current && wallGroupRef.current) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(wallGroupRef.current, true);

      if (intersects.length) {
        productRef.current.position.set(
          intersects[0].point.x,
          specificHeight,
          intersects[0].point.z
        );
      }
    }
  });

  return (
    <>
      <Canvas
        style={{ width: 1280, height: 720 }}
        camera={{ position: [7, 7, 10] }}
        shadows
        onPointerMove={event => {
          const x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
          const y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
          setMouse(new Vector2(x, y));
        }}
        onPointerDown={() => {
          if (productRef.current && wallGroupRef.current) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(
              wallGroupRef.current,
              true
            );

            if (intersects.length) {
              productRef.current.position.set(
                intersects[0].point.x,
                specificHeight,
                intersects[0].point.z
              );
            }
          }
        }}
      >
        <ambientLight />
        <pointLight
          position={[10, 8, 10]}
          intensity={100}
          color="#fff"
          castShadow
        />
        <Suspense fallback={<Loader />}>
          <Room wallGroup={wallGroupRef} floorGroup={floorGroupRef} />
          <ProductUniFi ref={productRef} />
        </Suspense>
        <OrbitControls makeDefault />
        <Environment background={true} blur={0.5} preset={'sunset'} />
      </Canvas>
    </>
  );
};

export default MainScene;
