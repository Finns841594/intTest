import { Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';
import { v4 as uuidv4 } from 'uuid';
import { Canvas } from '@react-three/fiber';
import ProductUniFi from './ProductUniFi';
import { OrbitControls } from '@react-three/drei';

const MenuBar = () => {
  const { setAddAProduct, setProducts, products } = useProductContext();

  const addProductHandle = () => {
    const newProducts = {
      id: uuidv4(),
      name: 'UniFi',
      modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
      position:
        products.length > 0
          ? products[products.length - 1].position
              .clone()
              .add(new Vector3(1, 0, 1))
          : new Vector3(0, 0, 0),
    } as Product;
    setAddAProduct(true);
    setProducts([...products, newProducts]);
  };
  const exampleProductUniFi = {
    id: uuidv4(),
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(0, 0, 0),
  } as Product;
  return (
    <>
      <div className="border p-3">
        <Canvas
          style={{ width: 100, height: 100 }}
          camera={{ position: [0, 0, 1], fov: 70 }}
        >
          <ambientLight />
          <ProductUniFi productInfo={exampleProductUniFi} />
          <OrbitControls makeDefault />
        </Canvas>
        <button onClick={addProductHandle}>Add a product</button>
      </div>
    </>
  );
};

export default MenuBar;
