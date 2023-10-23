import {
  Environment,
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Mesh } from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Model = () => {
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  useEffect(() => {
    console.log(floorPlan);
    floorPlan.scene.traverse(child => {
      // if (child instanceof Mesh) {
      //   console.log('Mesh Name:', child.name || 'Unnamed', 'Mesh:', child);
      // }
      if (
        child instanceof Mesh &&
        child.name.toLowerCase().includes('ceilingnode')
      ) {
        child.visible = false;
      }
      if (child instanceof Mesh && child.name.toLowerCase().includes('wall')) {
        child.castShadow = true;
      }
      if (child instanceof Mesh && child.name.toLowerCase().includes('floor')) {
        child.receiveShadow = true;
      }
    });
  }, [floorPlan]);
  return <primitive object={floorPlan.scene} />;
};

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
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls makeDefault />
        <Environment background={true} blur={0.5} preset={'sunset'} />
      </Canvas>
    </>
  );
};

export default MainView;
