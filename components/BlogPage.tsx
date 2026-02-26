import React from 'react';
import { BlogPost } from '../App';

interface BlogPageProps {
  posts: BlogPost[];
  onNavigateToPost: (postId: string) => void;
}

const BlogPostCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => (
  <div 
    className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col group"
    onClick={onClick}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
    tabIndex={0}
    role="link"
    aria-label={`Ler artigo: ${post.title}`}
  >
    <img src={post.imageUrl1} alt={post.title} className="w-full h-56 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <h3 className="font-display text-2xl font-bold text-prospera-purple mb-4 flex-grow group-hover:text-prospera-pink transition-colors">
        {post.title}
      </h3>
      <span className="font-bold text-prospera-green group-hover:underline">
        Ler mais &rarr;
      </span>
    </div>
  </div>
);

const BlogPage: React.FC<BlogPageProps> = ({ posts, onNavigateToPost }) => {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="bg-gray-50 py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-4">
            Blog Prospera Kids
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Dicas, reflexões e histórias para ajudar você a plantar valores no coração dos seus filhos.
          </p>
        </div>

        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map(post => (
              <BlogPostCard key={post.id} post={post} onClick={() => onNavigateToPost(post.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700">Nenhum artigo publicado ainda.</h2>
            <p className="text-gray-500 mt-2">Volte em breve para conferir nosso conteúdo!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
