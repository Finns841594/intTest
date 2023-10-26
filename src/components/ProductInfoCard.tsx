import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';

interface ProductInfoProp {
  productInfo: Product;
}

const ProductInfoCard: React.FC<ProductInfoProp> = ({ productInfo }) => {
  const { setIsCheckingProduct, setCurrentProductId } = useProductContext();
  const handleMouseEnter = () => {
    setIsCheckingProduct(true);
    setCurrentProductId(productInfo.id);
    console.log('current in id: ', productInfo.id);
  };

  const handleMouseLeave = () => {
    setIsCheckingProduct(false);
    setCurrentProductId('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
    console.log('out');
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border"
    >
      <h3>{productInfo.name}</h3>
      <p>{productInfo.id}</p>
    </div>
  );
};
export default ProductInfoCard;
