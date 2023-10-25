import MainScene from './components/MainScene';
import { ProductProvider } from './contexts/AppContext';

function App() {
  return (
    <ProductProvider>
      <div className="h-full bg-slate-100 flex flex-col items-center">
        <h1>View</h1>
        <MainScene />
      </div>
    </ProductProvider>
  );
}

export default App;
