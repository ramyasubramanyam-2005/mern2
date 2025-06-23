import { BlogPost, Category, Comment, User } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', description: 'Latest tech trends and news', color: '#3B82F6' },
  { id: '2', name: 'Design', slug: 'design', description: 'UI/UX and creative design', color: '#8B5CF6' },
  { id: '3', name: 'Lifestyle', slug: 'lifestyle', description: 'Life tips and experiences', color: '#10B981' },
  { id: '4', name: 'Business', slug: 'business', description: 'Entrepreneurship and business insights', color: '#F59E0B' },
  { id: '5', name: 'Travel', slug: 'travel', description: 'Travel guides and experiences', color: '#EF4444' }
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    displayName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Tech enthusiast and blogger',
    role: 'user',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'UX Designer and creative writer',
    role: 'user',
    createdAt: new Date('2024-01-05')
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Great article! Very insightful.',
    author: mockUsers[1],
    postId: '1',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    content: 'Thanks for sharing this. Looking forward to more content like this.',
    author: mockUsers[0],
    postId: '1',
    createdAt: new Date('2024-01-16')
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `<h2>Introduction</h2>
    <p>Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging regularly. As we move through 2024, several key trends are shaping the future of how we build and interact with web applications.</p>
    
    <h3>1. AI-Powered Development Tools</h3>
    <p>Artificial Intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable in modern development workflows.</p>
    
    <h3>2. Web Assembly (WASM) Adoption</h3>
    <p>WebAssembly is enabling high-performance applications in the browser, allowing languages like Rust, C++, and Go to run at near-native speeds on the web.</p>
    
    <h3>3. Progressive Web Apps (PWAs)</h3>
    <p>PWAs continue to bridge the gap between web and native applications, offering app-like experiences with the reach and accessibility of the web.</p>
    
    <p>These trends represent just the beginning of what's possible in modern web development. Stay tuned for more exciting developments!</p>`,
    excerpt: 'Explore the cutting-edge trends shaping web development in 2024, from AI-powered tools to WebAssembly adoption.',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockUsers[0],
    category: 'Technology',
    tags: ['web development', 'AI', 'WebAssembly', 'PWA'],
    likes: 24,
    likedBy: ['2'],
    comments: [mockComments[0], mockComments[1]],
    published: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Designing for Accessibility: A Comprehensive Guide',
    content: `<h2>Why Accessibility Matters</h2>
    <p>Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. It's not just a legal requirement—it's a moral imperative and good business practice.</p>
    
    <h3>Key Principles of Accessible Design</h3>
    <ul>
      <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
      <li><strong>Operable:</strong> Interface components must be operable by all users</li>
      <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
      <li><strong>Robust:</strong> Content must be robust enough for interpretation by assistive technologies</li>
    </ul>
    
    <h3>Practical Implementation Tips</h3>
    <p>Start with semantic HTML, ensure proper color contrast, provide alternative text for images, and test with screen readers. Small changes can make a huge difference in user experience.</p>`,
    excerpt: 'Learn how to create inclusive web experiences through thoughtful accessibility design principles and practical implementation strategies.',
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockUsers[1],
    category: 'Design',
    tags: ['accessibility', 'UX', 'inclusive design'],
    likes: 18,
    likedBy: ['1'],
    comments: [],
    published: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '3',
    title: 'Remote Work: Building a Productive Home Office',
    content: `<h2>Creating Your Ideal Workspace</h2>
    <p>The shift to remote work has made it essential to create a productive home office environment. Here's how to set up a space that enhances focus and creativity.</p>
    
    <h3>Essential Equipment</h3>
    <p>Invest in a good chair, proper lighting, and a reliable internet connection. These basics form the foundation of any productive workspace.</p>
    
    <h3>Organizing Your Space</h3>
    <p>Keep your workspace clutter-free and organized. Use storage solutions that work for your specific needs and workflow.</p>
    
    <h3>Maintaining Work-Life Balance</h3>
    <p>Set clear boundaries between work and personal time. Having a dedicated workspace helps maintain this separation.</p>`,
    excerpt: 'Discover practical tips for creating a productive and comfortable home office that supports remote work success.',
    coverImage: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockUsers[0],
    category: 'Lifestyle',
    tags: ['remote work', 'productivity', 'home office'],
    likes: 12,
    likedBy: [],
    comments: [],
    published: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  }
];