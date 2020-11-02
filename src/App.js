import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from "./layouts/Layout"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
