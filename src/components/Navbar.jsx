import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Prodigy Blog</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Sign Up</Link>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              About
            </a>
          </nav>
        </div>
      </header>
  )
}

export default Navbar