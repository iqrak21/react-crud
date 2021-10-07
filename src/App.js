import React from 'react';
import { Home } from "./components/pages/Home";
import { Edit } from "./components/student/Edit";
import { View } from "./components/student/View";
import {BrowserRouter ,Switch,Route} from 'react-router-dom';

function App(){
  return(
<>
<BrowserRouter>
<Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/view/:id" component={View}/>
  <Route exact path="/edit/:id" component={Edit}/>
</Switch>
</BrowserRouter>
</>
  );
}
export default App;
