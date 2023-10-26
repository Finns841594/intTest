import { Canvas } from '@react-three/fiber';
import MainScene from './components/MainScene';
import MenuBar from './components/MenuBar';
import { ProductProvider } from './contexts/AppContext';

function App() {
  return (
    <ProductProvider>
      <div className="h-screen bg-slate-100 flex flex-col items-center">
        <h1>View</h1>
        <MenuBar />
        <div className="w-10/12 h-4/6">
          <MainScene />
        </div>
        <h1>CurrentProductsList</h1>
        {/* <CurrentProductsList /> */}
      </div>
    </ProductProvider>
  );
}

export default App;
