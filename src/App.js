import './App.css';
import '@shopify/polaris/build/esm/styles.css';
// import NavigationExample from './components/NavigationExample';
import { Routes, Route } from "react-router-dom";
import Listing from './components/Listing';
import Dashboard from './components/Dashboard';
import TitleComponents from './Title/TitleComponents';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<TitleComponents />} />
        </Route>
       
      </Routes>
    </div>
  );
}

export default App;
