import { Canvas } from '@react-three/fiber';
import ProductUniFiPreview from './ProductUniFiPreview';
import { Product } from '../types/innerTypes';
import { useProductContext } from '../contexts/AppContext';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { OrbitControls } from '@react-three/drei';

interface NewProductCardProp {
  productInfo: Product;
}

const NewProductCard = ({ productInfo }: NewProductCardProp) => {
  const {
    setAddAProduct,
    setProducts,
    products,
    setIsAttached,
    setCurrentProductId,
    setCurrentProduct,
  } = useProductContext();

  const addProductHandle = () => {
    const newProducts = {
      id: uuidv4(),
      name: productInfo.name,
      modelPath: productInfo.modelPath,
      position:
        products.length > 0
          ? products[products.length - 1].position
              .clone()
              .add(new Vector3(1, 0, 1))
          : productInfo.position,
      quaternion: productInfo.quaternion,
    } as Product;
    setAddAProduct(true);
    setProducts([...products, newProducts]);
    setCurrentProductId(newProducts.id);
    setIsAttached(false);
  };

  const handleMouseEnter = () => {
    setCurrentProduct(productInfo);
  };

  // const handleMouseLeave = () => {
  //   setCurrentProduct(undefined);
  // };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className="h-36 border-2 rounded-md px-2 hover:border-cyan-500 hover:border-2 flex flex-col adjust-items-center"
    >
      <div className="mx-auto">
        <Canvas
          style={{ width: 100, height: 100 }}
          camera={{ position: [0, 0, 1], fov: 70 }}
        >
          <ambientLight />
          <pointLight
            position={[1, 1, 1]}
            intensity={20}
            color="#fff"
            castShadow
          />
          <ProductUniFiPreview productInfo={productInfo} />
          <OrbitControls makeDefault />
        </Canvas>
      </div>
      <button
        onClick={addProductHandle}
        className="mt-1 border border-cyan-500 rounded text-cyan-500 px-2 hover:bg-cyan-500 hover:text-white"
      >
        Add to scene
      </button>
    </div>
  );
};

export default NewProductCard;
