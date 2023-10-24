import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Group, Mesh, Object3D } from 'three';

interface RoomProps {
  wallGroup: React.MutableRefObject<Object3D | null>;
  floorGroup: React.MutableRefObject<Object3D | null>;
}

const Room: React.FC<RoomProps> = ({ wallGroup, floorGroup }) => {
  const floorPlan = useGLTF('/floorPlan/scan.gltf');
  useEffect(() => {
    if (!wallGroup.current || !floorGroup.current) {
      const newWallGroup = new Group();
      const newFloorGroup = new Group();

      floorPlan.scene.traverse(child => {
        if (child instanceof Mesh) {
          const childName = child.name.toLowerCase();
          if (childName.includes('ceilingnode')) {
            child.visible = false;
          } else if (childName.includes('wall')) {
            child.castShadow = true;
            newWallGroup.add(child.clone());
          } else if (childName.includes('floor')) {
            child.receiveShadow = true;
            newFloorGroup.add(child.clone());
          }
        }
      });

      wallGroup.current = newWallGroup;
      floorGroup.current = newFloorGroup;
    }
  }, [floorPlan, wallGroup, floorGroup]);

  return (
    <>
      <primitive object={wallGroup.current} />
      <primitive object={floorGroup.current} />
    </>
  );
};

export default Room;
