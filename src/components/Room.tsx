import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Mesh } from 'three';

const Room = () => {
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  useEffect(() => {
    console.log(floorPlan);
    floorPlan.scene.traverse(child => {
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

export default Room;
