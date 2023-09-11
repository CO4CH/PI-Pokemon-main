import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/home/:id" component={Detail}/>
          <Route path="/pokemons" component={CreatePokemon}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
