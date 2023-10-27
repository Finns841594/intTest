import { Box, useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';

interface ProductUniFiProp {
  productInfo: Product;
}

const ProductUniFi: React.FC<ProductUniFiProp> = ({ productInfo }) => {
  const {
    productNewPosition,
    productNewQuaternion,
    setIsAttached,
    isAttached,
    currentProductId,
    setCurrentProductId,
    isCheckingProduct,
  } = useProductContext();
  const product = useGLTF(productInfo.modelPath);

  const scaleValue = 0.05;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  let highligtColor = 'white';

  if (isCheckingProduct && currentProductId === productInfo.id) {
    highligtColor = 'cyan';
  } else {
    highligtColor = 'white';
  }

  const onProductClick = () => {
    if (isAttached) {
      setIsAttached(false);
      setCurrentProductId(productInfo.id);
    }
  };

  return (
    <>
      <primitive
        object={product.scene.clone()}
        position={
          isAttached
            ? productInfo.position
            : currentProductId === productInfo.id
            ? productNewPosition
            : productInfo.position
        }
        quaternion={
          isAttached
            ? productInfo.quaternion
            : currentProductId === productInfo.id
            ? productNewQuaternion
            : productInfo.quaternion
        }
        onClick={onProductClick}
      />
      {/* Box below is for highligting when select from product lists */}
      <Box
        position={
          isAttached
            ? productInfo.position
            : currentProductId === productInfo.id
            ? productNewPosition
            : productInfo.position
        }
        quaternion={productInfo.quaternion}
        onClick={onProductClick}
      >
        <meshBasicMaterial
          attach="material"
          color={highligtColor}
          transparent={true}
          opacity={highligtColor !== 'white' ? 0.5 : 0}
        />
      </Box>
    </>
  );
};

export default ProductUniFi;
