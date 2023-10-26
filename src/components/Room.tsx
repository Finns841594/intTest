/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Mesh, Quaternion, Vector2 } from 'three';
import { useProductContext } from '../contexts/AppContext';

const Room = () => {
  const {
    productNewPosition,
    setProductNewPosition,
    productNewQuaternion,
    setProductNewQuaternion,
    isPlaceing,
    products,
    setProducts,
    currentProductId,
    setIsPlaceing,
    isAttached,
    setIsAttached,
  } = useProductContext();
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  const { raycaster, camera } = useThree();
  const mouse = new Vector2();
  const [wallMeshes, setWallMeshes] = useState<Mesh[]>([]);
  const [allMeshes, setAllMeshes] = useState<Mesh[]>([]);

  useEffect(() => {
    const walls: Mesh[] = [];
    const allMeshes: Mesh[] = [];

    floorPlan.scene.traverse(child => {
      if (child instanceof Mesh) {
        allMeshes.push(child);
        if (child.name.toLowerCase().includes('ceilingnode')) {
          // child.visible = false;
        }
        if (child.name.toLowerCase().includes('wall')) {
          child.castShadow = true;
          if (isPlaceing) {
            child.material.color.set('cyan');
            console.log('changed color for: ', child.name);
          } else {
            child.material.color.set('white');
          }
          walls.push(child);
        }
        if (child.name.toLowerCase().includes('floor')) {
          child.receiveShadow = true;
        }
      }
    });
    setWallMeshes(walls);
    setAllMeshes(allMeshes);
  }, [floorPlan, isPlaceing]);

  const onMouseMove = (event: MouseEvent) => {
    const canvas = event.target as HTMLCanvasElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    mouse.x = (mouseX / rect.width) * 2 - 1;
    mouse.y = -(mouseY / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(wallMeshes);

    if (intersects.length > 0 && !isAttached) {
      setIsPlaceing(true);
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point;
      let newQuaternion = new Quaternion(0, 0, 0, 1);
      if (firstIntersection.face) {
        newQuaternion = firstIntersection.object.quaternion;
      }
      if (!isAttached) {
        setProductNewPosition(newPosition);
        setProductNewQuaternion(newQuaternion);
      }
    } else {
      setIsPlaceing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [wallMeshes, isAttached, allMeshes]);

  const onClickHandle = () => {
    if (!isAttached) {
      setIsAttached(true);
      // set new position and quaternion of a product
      setProducts(
        products.map(product =>
          product.id === currentProductId
            ? {
                ...product,
                position: productNewPosition,
                quaternion: productNewQuaternion,
              }
            : product
        )
      );
    }
  };

  return (
    <>
      {allMeshes.map((mesh, index) => (
        <primitive key={index} object={mesh} onClick={onClickHandle} />
      ))}
    </>
  );
};

export default Room;
