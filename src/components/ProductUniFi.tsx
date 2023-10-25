import { Box, useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';

interface ProductUniFiProp {
  productInfo: Product;
}

const ProductUniFi: React.FC<ProductUniFiProp> = ({ productInfo }) => {
  const product = useGLTF(productInfo.modelPath);
  const { productNewPosition, setIsAttached, isAttached, setCurrentProductId } =
    useProductContext();

  const scaleValue = 0.1;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  console.log('I am ', productInfo.id, 'at', productInfo.position);

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
      // position={[productPosition[0], 1, productPosition[2]]}
      position={isAttached ? productInfo.position : productNewPosition}
      // position={productInfo.position}
      onClick={onProductClick}
    />
  );
};

export default ProductUniFi;
