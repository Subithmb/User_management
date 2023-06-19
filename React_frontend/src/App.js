import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import User from './routes/User';
import { Suspense } from 'react';
import Admin from './routes/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route path='/*'element={<User/>} />
        </Routes>
        <Suspense fallback={<h1 className='al'>loading...</h1>}>
          <Routes>
            <Route path='/admin/*'element={<Admin/>}/>
          </Routes>
        </Suspense>
      </Router>
     
    </div>
  );
}

export default App;
