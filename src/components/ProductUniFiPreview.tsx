import { useGLTF } from '@react-three/drei';
import { Product } from '../types/innerTypes';

interface ProductUniFiProp {
  productInfo: Product;
}

const ProductUniFiPreview: React.FC<ProductUniFiProp> = ({ productInfo }) => {
  const product = useGLTF(productInfo.modelPath);

  const scaleValue = 0.05;
  if (product.scene) {
    product.scene.scale.set(scaleValue, scaleValue, scaleValue);
  }

  return (
    <>
      <primitive
        object={product.scene.clone()}
        position={productInfo.position}
        quaternion={productInfo.quaternion}
      />
    </>
  );
};

export default ProductUniFiPreview;
