import { Box, useGLTF } from '@react-three/drei';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';
import { Group, Mesh, Vector3 } from 'three';
import { useEffect } from 'react';

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

  // product.scene.traverse(child => {
  //   if (child instanceof Mesh) {
  //     if (isCheckingProduct && currentProductId === productInfo.id) {
  //       child.material.color.set('aquamarine');
  //     } else {
  //       child.material.color.set('white');
  //     }
  //   }
  // });

  if (isCheckingProduct && currentProductId === productInfo.id) {
    highligtColor = 'aquamarine';
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
      <Box
        position={
          isAttached
            ? productInfo.position
            : currentProductId === productInfo.id
            ? productNewPosition
            : productInfo.position
        }
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
