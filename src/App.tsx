import './App.css';
import Header from './components/header/Header';
import LocationList from './components/locationList/LocationList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
