import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/RichTextEditor';
import { mockCategories } from '../data/mockData';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    coverImage: '',
    published: false
  });
  const [isPreview, setIsPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a backend
    console.log('Saving post:', formData);
    
    // Simulate saving
    alert('Post saved successfully!');
    navigate('/');
  };

  const generateExcerpt = () => {
    const plainText = formData.content.replace(/<[^>]*>/g, '');
    const excerpt = plainText.substring(0, 200);
    setFormData(prev => ({ ...prev, excerpt }));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
          </div>
        </div>

        {isPreview ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled Post'}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-8">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=3B82F6&color=fff`}
                  alt={user.displayName}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p>Start writing your post content...</p>' }}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter your post title..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {mockCategories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="web development, javascript, react"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL (optional)
                  </label>
                  <input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Post Content
                    </label>
                  </div>
                  <RichTextEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Write your post content here..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                      Excerpt
                    </label>
                    <button
                      type="button"
                      onClick={generateExcerpt}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your post..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{formData.published ? 'Publish Post' : 'Save Draft'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}