import { useProductContext } from '../contexts/AppContext';
import ProductInfoCard from './ProductInfoCard';

const CurrentProductsList = () => {
  const { products } = useProductContext();
  return (
    <>
      <div>
        {products.length > 0 &&
          products.map(product => (
            <ProductInfoCard key={product.id} productInfo={product} />
          ))}
      </div>
    </>
  );
};

export default CurrentProductsList;
