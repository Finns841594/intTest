import { useGLTF } from '@react-three/drei';
import { Ref, forwardRef, useEffect } from 'react';
import { Group } from 'three';

const ProductUniFi = forwardRef<Group>((props, ref) => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');

  useEffect(() => {
    console.log(product);
  }, [product]);

  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  return (
    <primitive ref={ref as Ref<Group>} object={product.scene} {...props} />
  );
});

export default ProductUniFi;
