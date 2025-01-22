import  { useContext, useState } from "react";
import { userContext } from "../Contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader";
import { Navigate } from "react-router-dom";
// import bcrypt from 'bcryptjs'
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    avatar_url: "",
  });

  const {supabase} = useContext(userContext)
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData( {...formData, [name]:value})
  };

  const validateForm = () => {
    const regError = {};
    if (!formData.firstName) regError.firstName = "First name is required";
    if (!formData.lastName) regError.lastName = "Last name is required";
    if (!formData.username) regError.username = "Username is required";
    if (!formData.email) regError.email = "Email is required";
    if (!formData.password) regError.password = "Password is required";
    if (formData.ConfirmPassword !== formData.password) regError.ConfirmPassword = "Password does not match";
    setErrors(regError);
    return Object.keys(regError).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        // const hashedpassword = await bcrypt.hash(formData.password, 10)
       setIsLoading(true)
      const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            img_url: formData.avatar_url
          }
        }
        })
        if (error) {
          console.error("Sign-up error:", error.message);
          toast.error(error.message)
          setIsLoading(false)
          return;
        } else {
          console.log("User created:", data);
          toast.success(data.message)
          setIsLoading(false)
          Navigate('/profile')
        }
        
        // Insert profile information into the 'profiles' table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id, // Use the user ID from the sign-up response
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            display_name: formData.username, 
            avatar_url: formData.avatar_url,
            email: formData.email
          },
        ]);
  
        if (profileError) {
          console.error("Error inserting profile:", profileError.message);
        } else {
          console.log("Profile inserted into 'profiles' table.");
        }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      {isLoading ? <Loader />: 
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

         
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

        
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your email"
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


          
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
             Comfirm Password
            </label>
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.ConfirmPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your password"
            />
            {errors.ConfirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword}</p>
            )}
          </div>


          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
             Profile Picture
            </label>
            <input
              type="file"
              id="avatar_url"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.avatar_url ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter your password"
            />
            {errors.avatar_url && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar_url}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    }
    </div>
  );
};

export default Register;
