import { useGLTF } from '@react-three/drei';
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

  const onProductClick = () => {
    setIsAttached(false);
    setCurrentProductId(productInfo.id);
    console.log('re-positioning');
  };

  if (!isAttached) {
    // setLocalPosition(productPosition);
    // console.log('new position:', productPosition);
  }

  return (
    <primitive
      object={product.scene}
      // position={[productPosition[0], 1, productPosition[2]]}
      position={isAttached ? productInfo.position : productNewPosition}
      onClick={onProductClick}
    />
  );
};

export default ProductUniFi;
