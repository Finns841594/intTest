import { useContext } from 'react';
import {
  Camera,
  Raycaster,
  Vector2,
  Scene,
  WebGLRenderer,
  Quaternion,
  Vector3,
} from 'three';
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

export const computeAlignmentQuaternion = (from: Vector3, to: Vector3) => {
  // Ensure vectors are normalized
  from.normalize();
  to.normalize();

  // Compute the rotation axis
  const axis = new Vector3().crossVectors(from, to);

  // If vectors are nearly opposite, pick an arbitrary perpendicular axis
  if (axis.lengthSq() < 0.0001) {
    const absFrom = new Vector3(
      Math.abs(from.x),
      Math.abs(from.y),
      Math.abs(from.z)
    );
    if (absFrom.x <= absFrom.y && absFrom.x <= absFrom.z) {
      axis.crossVectors(from, new Vector3(1, 0, 0)).normalize();
    } else if (absFrom.y <= absFrom.x && absFrom.y <= absFrom.z) {
      axis.crossVectors(from, new Vector3(0, 1, 0)).normalize();
    } else {
      axis.crossVectors(from, new Vector3(0, 0, 1)).normalize();
    }
  }

  // Compute the rotation angle
  const angle = Math.acos(from.dot(to));

  // Create a quaternion from axis and angle
  const quaternion = new Quaternion().setFromAxisAngle(axis, angle);

  return quaternion;
};
