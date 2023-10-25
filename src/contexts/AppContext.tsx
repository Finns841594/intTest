import { ReactNode, createContext, useContext, useState } from 'react';

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductContextType {
  productPosition: number[];
  setProductPosition: React.Dispatch<React.SetStateAction<number[]>>;
  canBePlaced: boolean;
  setCanBePlaced: React.Dispatch<React.SetStateAction<boolean>>;
  isAttached: boolean;
  setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [productPosition, setProductPosition] = useState([0, 0, 0]);
  const [isAttached, setIsAttached] = useState(true);
  const [canBePlaced, setCanBePlaced] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        productPosition,
        setProductPosition,
        isAttached,
        setIsAttached,
        canBePlaced,
        setCanBePlaced,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
