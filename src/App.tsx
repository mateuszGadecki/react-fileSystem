import { Route, Switch } from 'react-router-dom';
import HomePageRoute from './routes/homePage/homePage.component';

const App = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" component={HomePageRoute} />
    </Switch>
  );
};

export default App;
