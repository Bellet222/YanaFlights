import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import UserAccount from 'Components/UserAccount';
import MainPage from 'Components/MainPage';



function App() {



  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<MainPage/>}/>
        <Route path='/Account' element = {<UserAccount/>}/>
      </Routes>
      

    </div>
  );
}

export default App;
