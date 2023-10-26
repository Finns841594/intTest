/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Mesh, Quaternion, Vector2, Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';
import { computeAlignmentQuaternion } from '../utils/threeJsTools';

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

  useEffect(() => {
    const walls: Mesh[] = [];

    floorPlan.scene.traverse(child => {
      if (child instanceof Mesh) {
        if (child.name.toLowerCase().includes('ceilingnode')) {
          child.visible = false;
        } else if (child.name.toLowerCase().includes('wall')) {
          child.castShadow = true;
          if (isPlaceing) {
            child.material.color.set('cyan');
          } else {
            child.material.color.set('white');
          }
          walls.push(child);
          // localWallsGroup.add(child.clone());
        } else if (child.name.toLowerCase().includes('floor')) {
          child.receiveShadow = true;
        } else {
          // localFurnituresGroup.add(child.clone());
        }
      }
    });
    setWallMeshes(walls);
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
        const reference = new Vector3(0, 0, 1);
        newQuaternion = computeAlignmentQuaternion(
          reference,
          firstIntersection.face?.normal
        );
        // newQuaternion = firstIntersection.object.quaternion;
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
  }, [wallMeshes, isAttached]);

  const onClickHandle = () => {
    if (!isAttached) {
      setIsAttached(true);
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
    // console.log('camera: ', camera);
  };

  return (
    <>
      <primitive object={floorPlan.scene} onClick={onClickHandle} />
    </>
  );
};

export default Room;
