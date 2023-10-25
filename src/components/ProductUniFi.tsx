import { useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';

const ProductUniFi = () => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');
  const { productPosition, setIsAttached, isAttached } = useProductContext();

  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  const onProductClick = () => {
    setIsAttached(!isAttached);
    console.log('is attached:', isAttached);
  };

  return (
    <primitive
      object={product.scene}
      // position={[productPosition[0], 1, productPosition[2]]}
      position={productPosition}
      onClick={onProductClick}
    />
  );
};

export default ProductUniFi;
