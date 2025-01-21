import { useContext, useEffect, useState } from "react";
import { userContext } from "./components/Contexts/AuthContext";
import { Link } from "react-router-dom";

const App = () => {
  const img = 'https://img.freepik.com/free-photo/sky-clouds-cinematic-clouds-wallpaper-5_1562-742.jpg?t=st=1737392224~exp=1737395824~hmac=9e963bb34d97873cef211ab9de0c42cc610e298fb28a067817f006ae3cbb6a19&w=740'
  const [blogPost, setBlogPost] = useState([]);
  const { supabase } = useContext(userContext);

  const fetchPosts = async () => {
    try {
      const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .range(0, 9);  // Fetches the first 10 posts (0 to 9)
      
      if (posts) {
        setBlogPost(posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const MAX_LENGTH = 150;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPost.map((post) => {
            // Calculate preview content for each post
            const previewContent = post.content?.length > MAX_LENGTH
              ? post.content.slice(0, MAX_LENGTH) + "..."
              : post.content;

            return (
              <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                  <Link to={`/post/${post.id}`} className="text-blue-500 mt-2 inline-block">
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
