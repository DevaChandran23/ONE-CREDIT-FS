import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { postService } from '../../services/postService';
import { toast } from 'react-hot-toast';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && !image) {
      toast.error('Please add some content or an image');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      await postService.createPost(formData, user.token);
      
      setContent('');
      setImage(null);
      setImagePreview('');
      
      toast.success('Post created successfully!');
      onPostCreated && onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img 
            src={user?.profilePicture || '/default-avatar.png'} 
            alt={user?.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            
            {imagePreview && (
              <div className="mt-3 relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div>
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="post-image"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  <span>Add Photo</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || (!content.trim() && !image)}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  (isLoading || (!content.trim() && !image)) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
