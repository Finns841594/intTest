import { useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';

const ProductUniFi = () => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');
  const { productPosition } = useProductContext();

  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }
  return (
    <primitive
      object={product.scene}
      position={[productPosition[0], 0, productPosition[2]]}
    />
  );
};

export default ProductUniFi;
