import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import TodoFeature from './features/Todo';

function App() {
  return (
    <div className="App">
      Header
            <p><NavLink to="/todos" activeClassName="active-manu">Todos</NavLink></p>
            <p><NavLink to="/albums" activeClassName="active">Albums</NavLink></p>
            <Switch>
                     <Route path="/todos" component={ TodoFeature }></Route>
                     <Route path="/albums" component={ AlbumFeature }></Route>

                     <Route component={ NotFound }></Route>
            </Switch>
      Footer
    </div>
  );
}

export default App;
