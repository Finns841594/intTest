import { ReactNode, createContext, useContext, useState } from 'react';
import { Vector3 } from 'three';
import { Product } from '../types/innerTypes';
import { UUID } from 'crypto';

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductContextType {
  productNewPosition: Vector3;
  setProductNewPosition: React.Dispatch<React.SetStateAction<Vector3>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isPlaceing: boolean;
  setIsPlaceing: React.Dispatch<React.SetStateAction<boolean>>;
  isAttached: boolean;
  setIsAttached: React.Dispatch<React.SetStateAction<boolean>>;
  AddAProduct: boolean;
  setAddAProduct: React.Dispatch<React.SetStateAction<boolean>>;
  currentProductId: UUID | undefined;
  setCurrentProductId: React.Dispatch<React.SetStateAction<UUID | undefined>>;
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
  const [productNewPosition, setProductNewPosition] = useState(
    new Vector3(0, 0, 0)
  );
  const [products, setProducts] = useState([] as Product[]);
  const [isAttached, setIsAttached] = useState(true);
  const [isPlaceing, setIsPlaceing] = useState(false);
  const [AddAProduct, setAddAProduct] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<UUID | undefined>();

  return (
    <ProductContext.Provider
      value={{
        productNewPosition,
        setProductNewPosition,
        products,
        setProducts,
        isAttached,
        setIsAttached,
        isPlaceing,
        setIsPlaceing,
        AddAProduct,
        setAddAProduct,
        currentProductId,
        setCurrentProductId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};