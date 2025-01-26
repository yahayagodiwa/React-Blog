import { Link } from "react-router-dom";


const Profile = () => {
  return (
    <div className="forum-profile bg-gray-100 min-h-screen">
      {/* Cover Section */}
      <div className="cover-photo relative">
        <img
          src="https://img.freepik.com/free-photo/3d-render-pen-notepad-with-alram-clock-shopping-cart-pastel-color-background_460848-7114.jpg?t=st=1737037008~exp=1737040608~hmac=f55e98934a44ff7cd69c33a1e4ed4bc156249b832325a602a32afabfbe5329c0&w=900"
          alt="Cover"
          className="w-full h-60 object-cover"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src="https://fps.cdnpk.net/images/ai/image-generator/advantages/image-generator-freepik-7.webp?w=1920&h=1920&q=75"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="profile-info text-center mt-20">
    
        <div className="mt-8">
          <button className="bg-gray-600 text-white py-2 px-4 rounded-lg mx-2">
            Message
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mx-2">
            Follow
          </button>
          <Link to="/create">
          <button className="bg-blue-600 text-gray-800 py-2 px-4 rounded-lg mx-2">
            Create A Post
          </button>
          </Link>
        </div>
      </div>

      

      
     
    </div>
  );
};

export default Profile;
