/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import {
  Mesh,
  MeshBasicMaterial,
  Quaternion,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three';
import { useProductContext } from '../contexts/AppContext';
import { computeAlignmentQuaternion } from '../utils/threeJsTools';

const debugSphereGeometry = new SphereGeometry(0.05);
const debugSphereMaterial = new MeshBasicMaterial({ color: 0xff0000 });
const debugSphere = new Mesh(debugSphereGeometry, debugSphereMaterial);

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
    // const localWallsGroup = new Group();
    // const localFurnituresGroup = new Group();

    floorPlan.scene.traverse(child => {
      if (child instanceof Mesh) {
        if (child.name.toLowerCase().includes('ceilingnode')) {
          child.visible = false;
        } else if (child.name.toLowerCase().includes('wall')) {
          child.castShadow = true;
          if (isPlaceing) {
            child.material.color.set('aquamarine');
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
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(wallMeshes);

    if (intersects.length > 0 && !isAttached) {
      setIsPlaceing(true);
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point;

      debugSphere.position.copy(newPosition);

      let newQuaternion = new Quaternion(0, 0, 0, 1);
      if (firstIntersection.face) {
        console.log(firstIntersection.object.quaternion);
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
    console.log('products: ', products);
  };

  return (
    <>
      <primitive object={debugSphere} />
      <primitive object={floorPlan.scene} onClick={onClickHandle} />
    </>
  );
};

export default Room;
