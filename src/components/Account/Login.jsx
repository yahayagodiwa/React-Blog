import  { useContext, useState } from 'react'
import { userContext } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../Loader'

const Login = () => {
  const {supabase} = useContext(userContext)
const navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
const [errors, setErrors] = useState({})
  const handleChange = (e) => { 
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const validateForm = () => { 
    const errors = {}
    if (!formData.email) errors.username = "Email is required"
    if (!formData.password) errors.password = "Password is required"
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit =  async (e) => { 
    e.preventDefault()
setIsLoading(true)
    if (!validateForm()) return
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    
  if (error) {
    console.error(error.message);
    toast.error(error.message)
    setIsLoading(false)
} else {
  const token = data.session?.access_token
  localStorage.setItem('token', token)
  toast.success('Login successfully')
  setIsLoading(false)
  navigate('/profile')
    // console.log('Login successfully');
}
  
  }
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      {isLoading ? <Loader /> :
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
      
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
}
    </div>

    </div>
  )
}

export default Login