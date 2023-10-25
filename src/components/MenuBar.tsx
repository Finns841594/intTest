import { Vector3 } from 'three';
import { useProductContext } from '../contexts/AppContext';
import { Product } from '../types/innerTypes';
import { v4 as uuidv4 } from 'uuid';

const MenuBar = () => {
  const { setAddAProduct, setProducts, products } = useProductContext();

  const addProductHandle = () => {
    const newProducts = {
      id: uuidv4(),
      name: 'UniFi',
      modelPath: 'products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf',
      position: new Vector3(0, 0, 0),
    } as Product;
    setAddAProduct(true);
    setProducts([...products, newProducts]);
  };
  return <button onClick={addProductHandle}>Add a product</button>;
};

export default MenuBar;
