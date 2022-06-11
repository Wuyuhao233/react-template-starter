
import "./App.less";
import RouteGuard from "./component/routeGuard";


import { routeTable } from "./router";

function App() {

  return <div className="App">
    <RouteGuard routes={routeTable}/>
 
  </div>;
}

export default App;
