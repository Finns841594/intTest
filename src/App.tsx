import CurrentProductsList from './components/CurrentProductsList';
import MainScene from './components/MainScene';
import MenuBar from './components/MenuBar';
import { ProductProvider } from './contexts/AppContext';

function App() {
  return (
    <ProductProvider>
      <div className="h-screen bg-slate-100 flex flex-col items-center">
        <div className="w-10/12 h-4/6">
          <MenuBar />
          <MainScene />
          <CurrentProductsList />
        </div>
      </div>
    </ProductProvider>
  );
}

export default App;
