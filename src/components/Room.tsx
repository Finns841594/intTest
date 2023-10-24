import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Mesh, Vector2 } from 'three';
import { useProductContext } from '../contexts/AppContext';

const Room = () => {
  const { setProductPosition } = useProductContext();
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  const { raycaster, camera, scene } = useThree();
  const mouse = new Vector2();

  useEffect(() => {
    console.log(floorPlan);
    floorPlan.scene.traverse(child => {
      if (child instanceof Mesh) {
        if (child.name.toLowerCase().includes('ceilingnode')) {
          child.visible = false;
        }
        if (child.name.toLowerCase().includes('wall')) {
          child.castShadow = true;
          child.visible = true;
        }
        if (!child.name.toLowerCase().includes('wall')) {
          child.visible = false;
        }
        // if (child.name.toLowerCase().includes('floor')) {
        //   child.receiveShadow = true;
        //
      }
    });
  }, [floorPlan]);

  const onMouseMove = (event: any) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point.toArray();
      console.log('Position', newPosition);
      setProductPosition(newPosition);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  return <primitive object={floorPlan.scene} />;
};

export default Room;
