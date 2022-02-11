import { useContext } from 'react';
import { LocationContext } from './context/LocationContext';
import Header from './components/header/Header';
import LocationList from './components/locationList/LocationList';
import './App.css';
import Loading from './components/loading/Loading';

const App: React.FC = () => {
  const { state } = useContext(LocationContext)

  return (
    <div className="App">
      <Header />
      {state.isPending && <Loading />}
      <LocationList />
    </div>
  );
}

export default App;
