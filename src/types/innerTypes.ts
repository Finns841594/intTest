import { UUID } from 'crypto';
import { Quaternion, Vector3 } from 'three';

export type Product = {
  id: UUID;
  name: string;
  modelPath: string;
  position: Vector3;
  quaternion: Quaternion;
};
