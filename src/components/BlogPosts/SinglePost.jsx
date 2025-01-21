import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../Contexts/AuthContext";
const SinglePost = () => {
    const img = 'https://img.freepik.com/free-photo/beautiful-landscape-with-blue-sky_23-2151906803.jpg?t=st=1737392380~exp=1737395980~hmac=7fb58c372bf289bdb3ec09409d8a335ae50f9b68016dadd5e8bc5271e3dba863&w=900'
    
    const { supabase } = useContext(userContext); 
  const { id } = useParams();  // id from the route params
  const [post, setPost] = useState(null);  // Initialize state to hold post data

  const fetchPost = async () => {
    let { data: postData, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)  // Use id directly from useParams
      .single();  // Retrieves a single post

    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(postData);  // Set the fetched post
    }
  };

  useEffect(() => {
    fetchPost();  // Fetch the post when the component mounts or when id changes
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;  // Loading state while fetching the post
  }

  return (
    <div className="h-[100vh] px-40 ">
        <ToastContainer />
      <h1 className="text-[30px] font-semibold py-3">{post.title}</h1>  
      <img src={img} className="h-48 w-full"/>
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> 
    </div>
  );
};

export default SinglePost;
