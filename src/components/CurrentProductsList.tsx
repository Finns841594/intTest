import { useProductContext } from '../contexts/AppContext';
import ProductInfoCard from './ProductInfoCard';

const CurrentProductsList = () => {
  const { products } = useProductContext();
  return (
    <>
      <div className="flex flex-row gap-5 align-start ">
        {products.length > 0 &&
          products.map(product => (
            <ProductInfoCard key={product.id} productInfo={product} />
          ))}
      </div>
    </>
  );
};

export default CurrentProductsList;
