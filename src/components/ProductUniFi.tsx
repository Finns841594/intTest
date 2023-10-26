import { useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';
import { Vector3 } from 'three';

interface ProductUniFiProp {
  productInfo: Product;
}

const ProductUniFi: React.FC<ProductUniFiProp> = ({ productInfo }) => {
  const product = useGLTF(productInfo.modelPath);
  const {
    productNewPosition,
    setIsAttached,
    isAttached,
    currentProductId,
    setCurrentProductId,
  } = useProductContext();
  const scaleValue = 0.05;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  const limitProductHeigt = (vec: Vector3): Vector3 => {
    // can set the limitation relates to the Room height
    const limitedHeigt = Math.max(0.5, Math.min(vec.y, 2.8));
    return new Vector3(vec.x, limitedHeigt, vec.z);
  };

  const onProductClick = () => {
    if (isAttached) {
      setIsAttached(false);
      setCurrentProductId(productInfo.id);
      console.log('re-positioning product:', productInfo.id);
    }
  };

  return (
    <primitive
      object={product.scene.clone(true)}
      position={limitProductHeigt(
        isAttached
          ? productInfo.position
          : currentProductId === productInfo.id
          ? productNewPosition
          : productInfo.position
      )}
      onClick={onProductClick}
    />
  );
};

export default ProductUniFi;
