import Header from './Header';
import Control from './Control';
import ProductList from './ProductList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Control></Control>
      <ProductList />
    </div>
  );
}

export default App;
