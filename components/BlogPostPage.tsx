
import React from 'react';
import { BlogPost } from '../App';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigateToMembers: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigateToMembers }) => {
  return (
    <div className="bg-white py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-3xl">
        <article>
          <header className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500">
              Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
            <img 
              src={post.imageUrl1} 
              alt={`Imagem para ${post.title}`} 
              className="w-full rounded-2xl shadow-lg my-8"
            />
            
            {post.text1.split('\n').map((paragraph, index) => (
              <p key={`p1-${index}`}>{paragraph}</p>
            ))}

            <img 
              src={post.imageUrl2} 
              alt={`Imagem secundária para ${post.title}`} 
              className="w-full rounded-2xl shadow-lg my-8"
            />

            {post.text2.split('\n').map((paragraph, index) => (
              <p key={`p2-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* CTA Section */}
        <section className="mt-16 pt-12 border-t-2 border-prospera-green/50 bg-prospera-blue/10 p-8 rounded-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-prospera-purple mb-4">
                Gostou do que leu?
            </h2>
            <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
                Transforme a teoria em prática! Receba histórias diárias no seu WhatsApp para fortalecer valores e criar momentos mágicos com seus filhos.
            </p>
            <button
                onClick={onNavigateToMembers}
                className="bg-prospera-green text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl hover:bg-prospera-purple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl animate-pulse-subtle"
            >
                Assinar por R$19,90
            </button>
        </section>

      </div>
    </div>
  );
};

export default BlogPostPage;
