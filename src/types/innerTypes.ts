import { UUID } from 'crypto';
import { Vector3 } from 'three';

export type Product = {
  id: UUID;
  name: string;
  modelPath: string;
  position: Vector3;
};
