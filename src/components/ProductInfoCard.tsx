import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';

interface ProductInfoProp {
  productInfo: Product;
}

const ProductInfoCard: React.FC<ProductInfoProp> = ({ productInfo }) => {
  const {
    setIsCheckingProduct,
    setCurrentProductId,
    setProducts,
    products,
    setIsLocatingProduct,
  } = useProductContext();

  const handleMouseEnter = () => {
    setIsCheckingProduct(true);
    setCurrentProductId(productInfo.id);
  };

  const handleMouseLeave = () => {
    setIsCheckingProduct(false);
    setCurrentProductId('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
  };

  const onDeleteHandle = () => {
    setProducts(products.filter(product => product.id !== productInfo.id));
  };

  const onLocateHandle = () => {
    setIsLocatingProduct(true);
    setCurrentProductId(productInfo.id);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border"
    >
      <h3>{productInfo.name}</h3>
      <div className="flex flex-row justify-between gap-3">
        {/* <button onClick={onLocateHandle}>Locate</button> */}
        <button onClick={onDeleteHandle}>Delete</button>
      </div>
    </div>
  );
};
export default ProductInfoCard;
