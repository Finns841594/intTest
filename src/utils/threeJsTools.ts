import { useContext } from 'react';
import { Camera, Raycaster, Vector2, Scene, WebGLRenderer } from 'three';
import { useProductContext } from '../contexts/AppContext';

export const getWorldCoords = (
  mouseX: number,
  mouseY: number,
  camera: Camera,
  scene: Scene,
  renderer: WebGLRenderer
): THREE.Vector3 | null => {
  const raycaster = new Raycaster();
  const width = renderer.domElement.width;
  const height = renderer.domElement.height;
  const mouse = new Vector2(
    (mouseX / width) * 2 - 1,
    -(mouseY / height) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length) {
    return intersects[0].point;
  }

  return null;
};
