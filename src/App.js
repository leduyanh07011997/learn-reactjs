import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
import Header from 'components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
        <Switch>
          <Route path="/" component={ CounterFeature } exact></Route>
          <Route path="/todos" component={ TodoFeature }></Route>
          <Route path="/albums" component={ AlbumFeature }></Route>

          <Route component={ NotFound }></Route>
        </Switch>
    </div>
  );
}

export default App;
