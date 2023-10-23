import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Mesh } from 'three';

const ProductUniFi = () => {
  const product = useGLTF('products/UniFi_AP_AC/UniFi_AP_AC_3D_model.gltf');
  useEffect(() => {
    console.log(product);
    // product.scene.traverse(child => {
    //   if (
    //     child instanceof Mesh &&
    //     child.name.toLowerCase().includes('ceilingnode')
    //   ) {
    //     child.visible = false;
    //   }
    // });
  }, [product]);
  return <primitive object={product.scene} />;
};

export default ProductUniFi;
