import { useProductContext } from '../contexts/AppContext';
import ProductInfoCard from './ProductInfoCard';

const CurrentProductsList = () => {
  const { products } = useProductContext();
  return (
    <>
      <div className="flex flex-row gap-6 align-start mt-4">
        <div className="w-36 p-2">
          <p className="font-bold">Products In Current Scene:</p>
        </div>
        <div className="flex flex-row gap-3">
          {products.length > 0 &&
            products.map(product => (
              <ProductInfoCard key={product.id} productInfo={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default CurrentProductsList;
