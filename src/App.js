import './App.css'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Jobs from './components/Jobs/Jobs'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails/JobItemDetails'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
