import './App.css';
import Login from './components/auth/Login';
import Fruits from "./assets/images/oranges.jpg";

function App() {
  return (
    <div className="App h-[100vh] bg-black text-white">
      <div className='flex flex-col p-[5%] md:p[10%] justify-center gap-4'>
        <h1>Fruit Gallery App</h1>
        <div>
          <img src={Fruits} alt='The app screenshot' className="w-96 m-auto" />
        </div>
        <div>This is an app that allows you to view the pictures of several fruits</div>
        <div>To login use the following email and password</div>
        <div>Email: user@example.com</div>
        <div>Password: 1Password</div>  
      </div>
      <Login />
    </div>
  );
}

export default App;
