import { useProductContext } from '../contexts/AppContext';
import NewProductCard from './NewProductCard';
import { productSamples } from '../data/initialData';

const MenuBar = () => {
  const { currentProduct } = useProductContext();

  return (
    <div className="h-40 my-2 flex flex-row justify-between ">
      <div className="flex flex-row gap-3">
        {productSamples.map(sample => (
          <NewProductCard key={sample.id} productInfo={sample} />
        ))}
      </div>

      <div className="w-2/6 p-3 flex flex-col">
        <div className="border-b-2 border-cyan-400 my-1 pb-1">
          <p className=" text-lg font-bold ">{currentProduct?.name}</p>
        </div>
        <p className="font-light text-sm">
          {
            productSamples.find(
              product => product.name === currentProduct?.name
            )?.introduction
          }
        </p>
      </div>
    </div>
  );
};

export default MenuBar;
