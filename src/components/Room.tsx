import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Group, Line, LineBasicMaterial, Mesh, Vector2, Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';

const Room = () => {
  const {
    setProductPosition,
    isPlaceing,
    setIsPlaceing,
    isAttached,
    setIsAttached,
  } = useProductContext();
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  const { raycaster, camera } = useThree();
  const mouse = new Vector2();
  const [wallMeshes, setWallMeshes] = useState<Mesh[]>([]);
  const [wallsGroup, setWallsGroup] = useState<Group | null>(null);
  const [furnitures, setFurnitures] = useState<Group | null>(null);

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
          if (isPlaceing) {
            child.material.color.set('blue');
          } else {
            child.material.color.set('white');
          }
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
    setWallsGroup(localWallsGroup);
    setWallMeshes(walls);
    setFurnitures(localFurnituresGroup);
  }, [floorPlan, isPlaceing]);

  const onMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(wallMeshes);

    if (intersects.length > 0) {
      setIsPlaceing(true);
      const [firstIntersection] = intersects;
      const newPosition = firstIntersection.point;
      if (!isAttached) {
        setProductPosition(newPosition);
      }
    } else {
      setIsPlaceing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [wallMeshes, isAttached]);

  // const onPointerEnterhandle = () => {
  //   console.log('in');
  //   setIsPlaceing(true);
  //   wallsGroup?.children.forEach(child => {
  //     if (child instanceof Mesh) {
  //       child.material.color.set('blue');
  //     }
  //   });
  // };

  // const onPointerLeaveHandle = () => {
  //   console.log('out');
  //   setIsPlaceing(false);
  //   wallsGroup?.children.forEach(child => {
  //     if (child instanceof Mesh) {
  //       child.material.color.set('white');
  //     }
  //   });
  // };

  // const getPointerPosition = (event: PointerEvent) => {
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   raycaster.setFromCamera(mouse, camera);
  //   console.log('mouse: ', mouse);
  //   console.log('camera: ', camera);
  //   console.log('raycaster: ', raycaster);
  //   // console.log('wallMeshes: ', wallMeshes);
  //   const intersects = raycaster.intersectObjects(wallMeshes);
  //   console.log('Raycaster intersects:', intersects);
  //   drawRayLine();
  //   if (intersects.length > 0) {
  //     const [firstIntersection] = intersects;
  //     const newPosition = firstIntersection.point.toArray();
  //     return newPosition;
  //   } else {
  //     return;
  //   }
  // };

  // const onPointerUpHandle = (event: PointerEvent) => {
  //   console.log('position: ', getPointerPosition(event));
  // };

  const onClickHandle = () => {
    console.log('clicking');
    if (!isAttached) {
      setIsAttached(true);
      console.log('positioned');
    }
  };

  return (
    <>
      <primitive object={floorPlan.scene} onClick={onClickHandle} />
      {/* {wallMeshes.map((mesh, index) => (
        <primitive
          key={index}
          onPointerEnter={onPointerEnterhandle}
          onPointerLeave={onPointerLeaveHandle}
          object={mesh}
        />
      ))} */}
      {/* {wallsGroup && (
        <primitive
          onPointerEnter={onPointerEnterhandle}
          onPointerLeave={onPointerLeaveHandle}
          onPointerUp={onPointerUpHandle}
          object={wallsGroup}
        />
      )}
      {rayLine && <primitive object={rayLine} />} */}
      {/* {furnitures && (
        <primitive
          onPointerEnter={onPointerEnterhandle}
          onPointerLeave={onPointerLeaveHandle}
          onPointerUp={onPointerUpHandle}
          object={furnitures}
        />
      )} */}
    </>
  );
};

export default Room;
