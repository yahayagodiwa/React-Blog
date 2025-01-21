

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
      <div className="profile-info text-center mt-16">
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-gray-600">Member since January 2023</p>
        <div className="mt-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mx-2">
            Message
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mx-2">
            Follow
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs mt-8 border-b">
        <div className="max-w-4xl mx-auto flex justify-between px-4">
          <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-semibold">
            Posts
          </button>
          
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts mt-8 max-w-4xl mx-auto px-4">
        {/* Sample Post */}
        <div className="post bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-gray-800 font-bold">John Doe</h3>
              <p className="text-gray-500 text-sm">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-700">
            This is a sample post in the forum. The content of the post will
            appear here.
          </p>
          <div className="flex justify-between items-center mt-4">
            <button className="text-blue-600 font-medium">Like</button>
            <button className="text-blue-600 font-medium">Comment</button>
          </div>
        </div>
        {/* End of Sample Post */}
      </div>
    </div>
  );
};

export default Profile;
