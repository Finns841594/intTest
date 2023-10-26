import React, { useContext } from 'react';
import { useThree } from '@react-three/fiber';
import { Camera } from 'three';
import { SceneContext } from '../contexts/AppContext';

interface SmallCanvasProps {
  camera: Camera | null;
}

const SmallCanvas = ({ camera }: SmallCanvasProps) => {
  const scene = useContext(SceneContext);
  const { gl } = useThree();

  React.useEffect(() => {
    if (scene?.current && camera) {
      gl.setRenderTarget(null);
      gl.render(scene.current, camera);
    }
  }, [gl, scene, camera]);

  return null;
};

export default SmallCanvas;
