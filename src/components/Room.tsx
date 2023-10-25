import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Group, Mesh, Vector2 } from 'three';
import { useProductContext } from '../contexts/AppContext';

const Room = () => {
  const {
    setProductNewPosition,
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
    // console.log(floorPlan);
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
      if (!isAttached) {
        setProductNewPosition(newPosition);
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
    console.log('clicking');
    if (!isAttached) {
      setIsAttached(true);
      setProducts(
        products.map(product =>
          product.id === currentProductId
            ? { ...product, position: productNewPosition }
            : product
        )
      );
      console.log('positioned');
      console.log('currentProductId:', currentProductId);
      console.log(products);
    }
  };

  return (
    <>
      <primitive object={floorPlan.scene} onClick={onClickHandle} />
    </>
  );
};

export default Room;
