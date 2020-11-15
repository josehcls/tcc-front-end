import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from "./layouts/Layout"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e64a19',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Layout} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
