/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Group, Mesh, Quaternion, Vector2, Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';
import { computeAlignmentQuaternion } from '../utils/threeJsTools';

const Room = () => {
  const {
    setProductNewPosition,
    setProductNewQuaternion,
    isPlaceing,
    products,
    setProducts,
    currentProductId,
    setIsPlaceing,
    productNewPosition,
    isAttached,
    setIsAttached,
  } = useProductContext();
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  const { raycaster, camera } = useThree();
  const mouse = new Vector2();
  const [wallMeshes, setWallMeshes] = useState<Mesh[]>([]);

  useEffect(() => {
    const walls: Mesh[] = [];
    const localWallsGroup = new Group();
    const localFurnituresGroup = new Group();

    floorPlan.scene.traverse(child => {
      if (child instanceof Mesh) {
        if (child.name.toLowerCase().includes('ceilingnode')) {
          child.visible = false;
        } else if (child.name.toLowerCase().includes('wall')) {
          child.castShadow = true;
          walls.push(child);
          localWallsGroup.add(child.clone()); // .add will take this child away and crashes the app, so use .clone() here
        } else if (child.name.toLowerCase().includes('floor')) {
          child.receiveShadow = true;
        } else {
          localFurnituresGroup.add(child.clone());
          if (isPlaceing) {
            child.material.color.set('aquamarine');
          } else {
            child.material.color.set('white');
          }
        }
      }
    });
    setWallMeshes(walls);
  }, [floorPlan, isPlaceing]);

  const onMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(wallMeshes);

    if (intersects.length > 0 && !isAttached) {
      setIsPlaceing(true);
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point;
      let newQuaternion = new Quaternion(0, 0, 0, 0);
      if (firstIntersection.face) {
        console.log(firstIntersection.face.normal);
        const reference = new Vector3(0, 0, 1);
        newQuaternion = computeAlignmentQuaternion(
          reference,
          firstIntersection.face?.normal
        );
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
            ? { ...product, position: productNewPosition }
            : product
        )
      );
    }
  };

  return (
    <>
      <primitive object={floorPlan.scene} onClick={onClickHandle} />
    </>
  );
};

export default Room;
