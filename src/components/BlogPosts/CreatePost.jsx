import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { userContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreatePost = () => {
  const { supabase, token, user } = useContext(userContext);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    img_url: ''
  });

  const [file, setFile] = useState(null); // To store the selected file temporarily

  // Handle image file selection
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);  // Store the selected file
  };

  // Submit the post to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    let img_url = postData.img_url;  // Use the existing image URL or upload a new one

    if (file) {
      // Upload the image to Supabase storage if there's a file selected
      const { data, error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(`postImages/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError.message);
      } else {
        // Get the public URL of the uploaded image
        const { data: urlData} = await supabase
          .storage
          .from('images')
          .getPublicUrl(`postImages/${file.name}`);

        if (urlData.publicUrl) {
          img_url = urlData.publicUrl; // Update the image URL
          console.log('Public URL:', img_url);
        } else {
          console.error('Error getting public URL:', urlData.message);
           // Update the image URL if successful
        }
      }
    }

    // Insert the post data into the database
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: postData.title,
        content: postData.content,
        img_url: img_url,
        author: user.user_metadata.username
      }]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      toast.success('Posted')
      navigate('/')
      // console.log('Data inserted:', data);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='py-10 px-20'>
      <ToastContainer />
          <div className="editor">
            <h1 className='font-bold text-[30px]'>Create A post</h1>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2 text-[25px]">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                className='border w-full px-10 outline-none py-3'
                placeholder='Enter the blog title'
              />
            </div>
            <ReactQuill
              value={postData.content}
              onChange={(value) => setPostData({ ...postData, content: value })}
              name="content"
              theme="snow"
              placeholder="Write something..."
              className='h-60'
            />
          </div>

          <div className="mb-4 my-16">
            <label htmlFor="img_url" className="block text-gray-700 font-medium mb-2">
              Post Image
            </label>
            <input
              type="file"
              id="img_url"
              name="img_url"
              onChange={handleImage}
              className="w-full px-3 py-2 border"
            />
          </div>
        </div>

        <div>
          <button type="submit" className='py-4 mx-20 my-5 px-8 bg-blue-600 text-white'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
