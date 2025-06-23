import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Star } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { mockBlogPosts, mockCategories } from '../data/mockData';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockBlogPosts.filter(post => post.published);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'trending':
        return filtered.sort((a, b) => b.comments.length - a.comments.length);
      default:
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [selectedCategory, sortBy]);

  const featuredPost = filteredAndSortedPosts[0];
  const otherPosts = filteredAndSortedPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your Ideas with the World
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover amazing stories, thinking, and expertise from writers on any topic.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Writing Today
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              {mockCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.name
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.name ? category.color : undefined
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'trending')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Liked</option>
                <option value="trending">Most Discussed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>
            <BlogCard post={featuredPost} variant="featured" />
          </section>
        )}

        {/* Latest Posts */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            {sortBy === 'latest' && <Clock className="h-6 w-6 text-blue-600" />}
            {sortBy === 'popular' && <Star className="h-6 w-6 text-yellow-500" />}
            {sortBy === 'trending' && <TrendingUp className="h-6 w-6 text-green-600" />}
            <h2 className="text-2xl font-bold text-gray-900">
              {sortBy === 'latest' && 'Latest Articles'}
              {sortBy === 'popular' && 'Popular Articles'}
              {sortBy === 'trending' && 'Trending Articles'}
            </h2>
          </div>
          
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6">Get the latest articles delivered straight to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}