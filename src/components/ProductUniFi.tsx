import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const ProductUniFi = () => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');
  useEffect(() => {
    console.log(product);
  }, [product]);
  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }
  return <primitive object={product.scene} />;
};

export default ProductUniFi;
