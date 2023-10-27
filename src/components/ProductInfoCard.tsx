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

  // const onLocateHandle = () => {
  //   setIsLocatingProduct(true);
  //   setCurrentProductId(productInfo.id);
  // };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border-2 rounded-md w-30 p-2 hover:border-cyan-500 hover:border-2"
    >
      <p className="px-1 font-bold">{productInfo.name}</p>
      <div className="flex flex-row justify-between gap-3 mt-1">
        {/* <button onClick={onLocateHandle}>Locate</button> */}
        <button
          className="w-24 border border-red-500 rounded text-red-500 px-2 hover:bg-red-500 hover:text-white"
          onClick={onDeleteHandle}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default ProductInfoCard;
