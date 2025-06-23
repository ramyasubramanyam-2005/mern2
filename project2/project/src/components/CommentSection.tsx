import React, { useState } from 'react';
import { MessageCircle, Send, Reply, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    // In a real app, this would submit to backend
    console.log('New comment:', { postId, content: newComment, userId: user.id });
    setNewComment('');
    alert('Comment added successfully!');
  };

  const handleSubmitReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyText.trim() || !user) return;

    // In a real app, this would submit to backend
    console.log('New reply:', { postId, parentId: commentId, content: replyText, userId: user.id });
    setReplyText('');
    setReplyTo(null);
    alert('Reply added successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start space-x-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=3B82F6&color=fff`}
              alt={user.displayName}
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Post Comment</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-600 mb-4">Please log in to leave a comment.</p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={(commentId) => setReplyTo(commentId)}
              replyTo={replyTo}
              replyText={replyText}
              setReplyText={setReplyText}
              onSubmitReply={handleSubmitReply}
              user={user}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  replyTo: string | null;
  replyText: string;
  setReplyText: (text: string) => void;
  onSubmitReply: (e: React.FormEvent, commentId: string) => void;
  user: any;
}

function CommentItem({
  comment,
  onReply,
  replyTo,
  replyText,
  setReplyText,
  onSubmitReply,
  user
}: CommentItemProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="border-l-2 border-gray-100 pl-6">
      <div className="flex items-start space-x-4">
        <img
          src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.displayName}&background=3B82F6&color=fff`}
          alt={comment.author.displayName}
          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">
                {comment.author.displayName}
              </span>
              <span className="text-sm text-gray-500">
                {format(comment.createdAt, 'MMM dd, yyyy')}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 text-sm">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                isLiked ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            
            {user && (
              <button
                onClick={() => onReply(comment.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyTo === comment.id && user && (
            <form
              onSubmit={(e) => onSubmitReply(e, comment.id)}
              className="mt-4 flex items-start space-x-4"
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.displayName}&background=3B82F6&color=fff`}
                alt={user.displayName}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author.displayName}...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows={2}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyText('');
                      onReply('');
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  replyTo={replyTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  onSubmitReply={onSubmitReply}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}