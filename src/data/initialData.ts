import { Quaternion, Vector3 } from 'three';
import { Product } from '../types/innerTypes';

export const initialProducts = [
  {
    id: 'ec65abde-287d-43ce-b2c5-b2a6ca3f5811',
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(11, 0.8, 9.2),
    quaternion: [0, -0.3605371251501466, 0, 0.9327448640375714],
  },
  {
    id: '0b40d87e-351d-4133-a962-a8f16fba300d',
    name: 'UniFi Blue',
    modelPath: 'products/UniFi_AP_AC_COS/UniFi_AP_AC_Blue.gltf',
    position: new Vector3(12.5, 0.8, 10.6),
    quaternion: [0, -0.3605371251501466, 0, 0.9327448640375714],
  },
] as unknown as Product[];

export const productSamples = [
  {
    id: '11111111-2222-3333-4444-b2a6ca3f5811',
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(0, 0, 0),
    quaternion: new Quaternion(0, 0, 0, 1),
    introduction:
      'High-performance, ceiling-mounted WiFi 6E access point designed to provide seamless, multi-band coverage within high-density client environments.',
  },
  {
    id: '11111111-2222-3333-5555-b2a6ca3f5811',
    name: 'UniFi Blue',
    modelPath: 'products/UniFi_AP_AC_COS/UniFi_AP_AC_Blue.gltf',
    position: new Vector3(0, 0, 0),
    quaternion: new Quaternion(0, 0, 0, 1),
    introduction:
      'Same good product but now with the selected color for your awsome tech taste! Season limited waving sky blue color!',
  },
  {
    id: '11111111-2222-3333-6666-b2a6ca3f5811',
    name: 'UniFi Yellow',
    modelPath: 'products/UniFi_AP_AC_COS/UniFi_AP_AC_Yellow.gltf',
    position: new Vector3(0, 0, 0),
    quaternion: new Quaternion(0, 0, 0, 1),
    introduction:
      'Same good product but now with the selected color for your awsome tech taste! Season limited summer shiny yellow color!',
  },
] as Product[];
