import './App.css';
import Login from './components/auth/Login';
import Fruits from "./assets/images/oranges.jpg";

function App() {
  return (
    <div className="App">
      <div className='m-auto'>
        <h1>Fruit Gallery App</h1>
        <img src={Fruits} alt='' />
        <p>This is an app that allows you to view the pictures of several fruits</p>
        <p>To login use the following email and password</p>
        <p>Email: user@example.com</p>
        <p>Password: 1Password</p>  
      </div>
      <Login />
    </div>
  );
}

export default App;
