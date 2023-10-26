import { Vector3 } from 'three';
import { Product } from '../types/innerTypes';

export const initialProducts = [
  {
    id: 'ec65abde-287d-43ce-b2c5-b2a6ca3f5811',
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(
      0.6556864474566204,
      2.566026477342583,
      1.1829047329146531
    ),
    quaternion: [0, 0, 0, 1],
  },
  {
    id: '0b40d87e-351d-4133-a962-a8f16fba300d',
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(
      2.2815999721654316,
      2.6048526217929684,
      1.1510762374625776
    ),
    quaternion: [0, 0, 0, 1],
  },
] as unknown as Product[];
