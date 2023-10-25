import { useProductContext } from '../contexts/AppContext';

const MenuBar = () => {
  const { setAddAProduct } = useProductContext();
  const addProductHandle = () => {
    setAddAProduct(true);
  };
  return <button onClick={addProductHandle}>Add a product</button>;
};

export default MenuBar;
