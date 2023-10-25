import { ReactNode, createContext, useContext, useState } from 'react';
import { Vector3 } from 'three';

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductContextType {
  productPosition: Vector3;
  setProductPosition: React.Dispatch<React.SetStateAction<Vector3>>;
  isPlaceing: boolean;
  setIsPlaceing: React.Dispatch<React.SetStateAction<boolean>>;
  isAttached: boolean;
  setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
  AddAProduct: boolean;
  setAddAProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [productPosition, setProductPosition] = useState(new Vector3(0, 0, 0));
  const [isAttached, setIsAttached] = useState(true);
  const [isPlaceing, setIsPlaceing] = useState(false);
  const [AddAProduct, setAddAProduct] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        productPosition,
        setProductPosition,
        isAttached,
        setIsAttached,
        isPlaceing,
        setIsPlaceing,
        AddAProduct,
        setAddAProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
