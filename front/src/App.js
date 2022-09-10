import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Header from "./components/Header";
import Home from './components/Home';
import Login from './components/Login';
import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import Details from "./components/Details";
import Favorites from "./components/Favorites";
import Episodes from "./components/Episodes";
import Episode from "./components/Episode";
import Watched from "./components/Watched";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
// import SaveToken from "./components/SaveToken";

function App() {
  const [isCo, setIsCo] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    console.log(isCo)
    fetch("http://localhost:5000/", {
      method: "GET",
    })
      .then(r => r.json())
      .then((res) => {
        if (res !== 401) {
          setIsCo(true);
        }
      })
      .catch((err) => console.log(err));
  }, [isCo]);

  return (
    <Router>
      {isCo && <Header /> }
      <Routes>
        <Route path="/" element={ <Home setIsCo={setIsCo} message={message} setMessage={setMessage} /> } />
        <Route path="/login" element={ <Login/> } />
        <Route exact path="/details" element={ <Details /> } />
        <Route exact path="/watched" element={ <Watched message={message} setMessage={setMessage} /> } />
        <Route path="/details/:id" element={ <Details /> } />
        <Route path="/episodes/:id/:url" exact element={ <Episodes message={message} setMessage={setMessage} /> } />
        <Route path="/episode/:id/:url" exact element={ <Episode message={message} setMessage={setMessage} /> } />
        <Route path="/favorites" element={ <Favorites message={message} setMessage={setMessage} /> } />
        <Route path="/getFriends" element={ <Friends message={message} setMessage={setMessage} /> } />
        <Route path="/profile" element={ <Profile message={message} setMessage={setMessage} /> } />
        <Route path="/profile/:id" element={ <Profile message={message} setMessage={setMessage} /> } />
        {/* <Route path="/saveToken" element={ <SaveToken/> } /> */}
        {/* <Route path="/auth/callback" element={ <Callback/> } /> */}
      </Routes>
    </Router>
  );
}

export default App;
