import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Mesh, Vector2 } from 'three';
import { useProductContext } from '../contexts/AppContext';

const Room = () => {
  const { setProductPosition, isAttached, setIsAttached } = useProductContext();
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  const { raycaster, camera } = useThree();
  const mouse = new Vector2();
  const [wallMeshes, setWallMeshes] = useState<Mesh[]>([]);
  const walls: Mesh[] = [];

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
          walls.push(child);
        }
        if (child.name.toLowerCase().includes('floor')) {
          child.receiveShadow = true;
        }
        if (child.name.toLowerCase().includes('wall') && isAttached) {
          child.material.color.set('blue');
        } else {
          child.material.color.set('white');
        }
      }
    });
    setWallMeshes(walls);
  }, [floorPlan, isAttached]);

  const onMouseMove = (event: any) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(wallMeshes);

    if (intersects.length > 0) {
      setIsAttached(true);
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point.toArray();
      // console.log('Position', newPosition);
      setProductPosition(newPosition);
    } else {
      setIsAttached(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [wallMeshes]);

  return <primitive object={floorPlan.scene} />;
};

export default Room;
