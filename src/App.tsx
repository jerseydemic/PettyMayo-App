import { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import { fetchPosts, type Post } from './data/posts';
import { Loader2, ArrowLeft, Share2 } from 'lucide-react';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handlePostClick = async (post: Post) => {
    if (post.content) {
      // If content exists, open internal article view
      setSelectedPost(post);
    } else {
      // Fallback to external URL
      await Browser.open({ url: post.articleUrl });
    }
  };

  const closeArticle = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-4 flex justify-between items-center">
        <div className="w-6" /> {/* Spacer */}
        <h1 className="text-xl font-bold tracking-tight uppercase">Petty Mayo</h1>
        <div className="w-6" /> {/* Spacer */}
      </header>

      {/* Grid Content */}
      <main className="p-0.5">
        {loading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="relative aspect-square w-full overflow-hidden bg-white/5 active:opacity-80 transition-opacity"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Article Overlay */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Article Header */}
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/10">
            <button
              onClick={closeArticle}
              className="p-2 -ml-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-white hover:text-gray-300">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-1 overflow-y-auto pb-20">
            {/* Hero Image */}
            <div className="w-full aspect-square relative">
              <img
                src={selectedPost.thumbnail}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            </div>

            <div className="px-6 -mt-12 relative z-10">
              <h1 className="text-3xl font-bold leading-tight mb-6 font-serif">{selectedPost.title}</h1>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest">End of Article</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
