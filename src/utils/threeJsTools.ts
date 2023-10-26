import { Quaternion, Vector3 } from 'three';

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

export const limitProductHeigt = (vec: Vector3): Vector3 => {
  // can set the limitation relates to the Room height
  const limitedHeigt = Math.max(0.5, Math.min(vec.y, 2.8));
  return new Vector3(vec.x, limitedHeigt, vec.z);
};

export const getFileExtension = (path: string): string | null => {
  const match = path.match(/\.[0-9a-z]+$/i);
  return match ? match[0] : null;
};
