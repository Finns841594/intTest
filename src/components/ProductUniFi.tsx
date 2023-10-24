import { useGLTF } from '@react-three/drei';

const ProductUniFi = () => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');

  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }
  return <primitive object={product.scene} position={[0, 0, 0]} />;
};

export default ProductUniFi;
