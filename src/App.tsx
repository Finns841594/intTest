import { Canvas } from '@react-three/fiber';
import MainScene from './components/MainScene';
import MenuBar from './components/MenuBar';
import { ProductProvider } from './contexts/AppContext';

function App() {
  return (
    <ProductProvider>
      <div className="h-full bg-slate-100 flex flex-col items-center">
        <h1>View</h1>
        <MenuBar />
        <Canvas
          style={{ width: 1280, height: 720 }}
          camera={{ position: [6, 8, 10] }}
          shadows
        >
          <ambientLight />
          <pointLight
            position={[10, 8, 10]}
            intensity={100}
            color="#fff"
            castShadow
          />
          <MainScene />
        </Canvas>
      </div>
    </ProductProvider>
  );
}

export default App;
