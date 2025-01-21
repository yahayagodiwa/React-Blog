// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Register from './components/Account/Register.jsx'
import AuthContext from './components/Contexts/AuthContext.jsx'
import CreatePost from './components/BlogPosts/CreatePost.jsx'
import Login from './components/Account/login.jsx'
import AuthRoute from './components/Account/AuthRoute.jsx'
import Profile from './components/Account/Profile.jsx'
import SinglePost from './components/BlogPosts/SinglePost.jsx'

const router = createBrowserRouter([
{
  path: '/',
  element: <Layout />,
  children: [
    {index: true, element: <App />},
    {path: '/register', element: <Register />},
    { path: '/login', element: <Login />},
    {path: '/create', element: <AuthRoute > <CreatePost /> </AuthRoute> },
    { path: '/profile', element: <AuthRoute > <Profile /> </AuthRoute> },
    {path: '/post/:id', element: <SinglePost />}
  ]
}
])

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>
  
)
