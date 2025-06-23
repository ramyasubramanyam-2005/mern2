import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { mockBlogPosts } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const post = mockBlogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would update the backend
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // In a real app, this would delete from backend
      alert('Post deleted successfully!');
      navigate('/');
    }
  };

  const canEdit = user && (user.id === post.author.id || user.role === 'admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Category */}
            <div className="mb-4">
              <Link
                to={`/category/${post.category}`}
                className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                style={{ backgroundColor: getCategoryColor(post.category) }}
              >
                {post.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author and meta info */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <Link to={`/profile/${post.author.username}`}>
                  <img
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.displayName}&background=3B82F6&color=fff`}
                    alt={post.author.displayName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <Link
                    to={`/profile/${post.author.username}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.author.displayName}
                  </Link>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(post.createdAt, 'MMMM dd, yyyy')}</span>
                    </div>
                    <span>
                      {Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
                    </span>
                  </div>
                </div>
              </div>

              {canEdit && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?tag=${encodeURIComponent(tag)}`}
                    className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes + (isLiked ? 1 : 0)}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments.length} comments</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </article>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Technology': '#3B82F6',
    'Design': '#8B5CF6',
    'Lifestyle': '#10B981',
    'Business': '#F59E0B',
    'Travel': '#EF4444'
  };
  return colors[category] || '#6B7280';
}