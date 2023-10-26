import { Quaternion, Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';
import { v4 as uuidv4 } from 'uuid';
import { Canvas } from '@react-three/fiber';
import ProductUniFi from './ProductUniFi';
import { OrbitControls } from '@react-three/drei';

const MenuBar = () => {
  const {
    setAddAProduct,
    setProducts,
    products,
    setIsAttached,
    setCurrentProductId,
  } = useProductContext();

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
      quaternion: new Quaternion(0, 0, 0, 1),
    } as Product;
    setAddAProduct(true);
    setProducts([...products, newProducts]);
    setCurrentProductId(newProducts.id);
    setIsAttached(false);
  };
  const exampleProductUniFi = {
    id: uuidv4(),
    name: 'UniFi',
    modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
    position: new Vector3(0, 0, 0),
  } as Product;
  return (
    <>
      <div className="flex flex-row">
        <div className="border p-3 hover:border-cyan-500">
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
            <ProductUniFi productInfo={exampleProductUniFi} />
            <OrbitControls makeDefault />
          </Canvas>
          <button onClick={addProductHandle}>Add to scene</button>
        </div>
        <div>product info</div>
      </div>
    </>
  );
};

export default MenuBar;
