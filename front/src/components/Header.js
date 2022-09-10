import { Link } from 'react-router-dom';
import logo from "../panda-origami-paper-svgrepo-com.svg"
import "../styles/Header.css";

function Header() {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav id='nav-header' className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link className="mr-5 hover:text-white" to="/">Home</Link>
          <Link className="mr-5 hover:text-white" to="/favorites">Your shows</Link>
          <Link className="mr-5 hover:text-white" to="/getFriends">Friends</Link>
        </nav>
        <Link to="/" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
            <img src={logo} alt="logo" />
          <span className="ml-3 text-xl xl:block lg:hidden">Previously On</span>
        </Link>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <Link to={"/profile"} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            Profile
            
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
