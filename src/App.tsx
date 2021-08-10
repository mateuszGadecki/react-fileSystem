import { Route, Switch } from 'react-router-dom';
import HomePageRoute from './routes/homePage/homePage.component';
import BrowseRoute from './routes/browse/browse.component';
import WizRoute from './routes/viz/viz.component';

const App = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" component={HomePageRoute} />
      <Route exact path="/browse" component={BrowseRoute} />
      <Route exact path="/viz" component={WizRoute} />
    </Switch>
  );
};

export default App;
