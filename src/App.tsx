import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import CurrentProductsList from './components/CurrentProductsList';
import MainScene from './components/MainScene';
import MenuBar from './components/MenuBar';
import SmallCanvas from './components/SmallCanvas';
import { ProductProvider } from './contexts/AppContext';
import { useRef } from 'react';

function App() {
  const cameraRef1 = useRef<PerspectiveCamera>(null);
  return (
    <ProductProvider>
      <div className="h-screen bg-slate-100 flex flex-col items-center">
        <h1>View</h1>
        <MenuBar />
        <div className="w-10/12 h-4/6">
          <MainScene />
        </div>
        <CurrentProductsList />
        <Canvas
          style={{
            width: '200px',
            height: '200px',
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}
          camera={{ position: [2, 2, 2], fov: 75 }}
        >
          <SmallCanvas camera={cameraRef1.current} />
        </Canvas>
      </div>
    </ProductProvider>
  );
}

export default App;
