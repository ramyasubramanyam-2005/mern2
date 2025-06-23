import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article className={clsx(
      'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
      isFeatured ? 'md:flex md:h-80' : 'flex flex-col h-full'
    )}>
      <div className={clsx(
        'relative',
        isFeatured ? 'md:w-1/2 flex-shrink-0' : 'aspect-video'
      )}>
        <Link to={`/post/${post.id}`}>
          <img
            src={post.coverImage || 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 text-xs font-semibold text-white rounded-full"
            style={{ backgroundColor: getCategoryColor(post.category) }}
          >
            {post.category}
          </span>
        </div>
      </div>

      <div className={clsx(
        'p-6 flex flex-col',
        isFeatured ? 'md:w-1/2 justify-center' : 'flex-1'
      )}>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <Link
              to={`/profile/${post.author.username}`}
              className="hover:text-blue-600 transition-colors"
            >
              {post.author.displayName}
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{format(post.createdAt, 'MMM dd, yyyy')}</span>
          </div>
        </div>

        <Link to={`/post/${post.id}`} className="group">
          <h2 className={clsx(
            'font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2',
            isFeatured ? 'text-2xl leading-tight' : 'text-xl'
          )}>
            {post.title}
          </h2>
        </Link>

        <p className={clsx(
          'text-gray-600 mb-4 line-clamp-3',
          isFeatured ? 'text-base' : 'text-sm'
        )}>
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              to={`/search?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="text-xs">
            {Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
          </div>
        </div>
      </div>
    </article>
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