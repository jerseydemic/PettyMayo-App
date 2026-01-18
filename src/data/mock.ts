export interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    image: string;
    author: string;
    date: string;
    content: string;
    tweetUrl?: string;
    order?: number;
}

export const ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Minimalist Architecture Trends for 2026',
        slug: 'minimalist-architecture-trends-2026',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?auto=format&fit=crop&q=80&w=1000',
        author: 'Sarah Chen',
        date: '2h ago',
        content: 'The era of clutter is officially over. 2026 brings a new wave of hyper-minimalism that focuses on raw materials and negative space.',
        tweetUrl: 'https://twitter.com/VisualNews/status/1234567890'
    },
    {
        id: '2',
        title: 'The Future of AI in Creative Arts',
        slug: 'future-of-ai-creative-arts-generative',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000',
        author: 'Marcus Neo',
        date: '4h ago',
        content: 'Generative AI is no longer a tool; it is a collaborator. We explore how artists are merging traditional techniques with neural networks.'
    },
    {
        id: '3',
        title: 'Urban Jungle: Returning to Nature',
        slug: 'urban-jungle-returning-to-nature',
        category: 'Lifestyle',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000',
        author: 'Elena Rodriguez',
        date: '6h ago',
        content: 'Cities are turning green. From vertical gardens to moss walls, the concrete jungle is finally blooming.'
    },
    {
        id: '4',
        title: 'Neon Nights: Cyberpunk Fashion',
        slug: 'neon-nights-cyberpunk-fashion-week',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
        author: 'Kai Tak',
        date: '12h ago',
        content: 'Tech-wear meets high fashion in the latest runway shows from Tokyo to Berlin.'
    },
    {
        id: '5',
        title: 'Coffee Culture Evolution',
        slug: 'coffee-culture-evolution-fourth-wave',
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000',
        author: 'Barista Joe',
        date: '1d ago',
        content: 'Third-wave coffee is out. Fourth-wave is all about molecular gastronomy applied to your morning brew.'
    },
    {
        id: '6',
        title: 'Silence in the Digital Age',
        slug: 'silence-digital-age-luxury',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1518536647111-9a63aa87e954?auto=format&fit=crop&q=80&w=1000',
        author: 'Dr. Emily Peace',
        date: '1d ago',
        content: 'In a world of constant notifications, silence has become the ultimate luxury commodity.'
    },
    {
        id: '7',
        title: 'Abstract Expressionism Revived',
        slug: 'abstract-expressionism-revived-digital',
        category: 'Art',
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=1000',
        author: 'Art Vandelay',
        date: '2d ago',
        content: 'The splash and splatter is back, but this time with a digital twist.'
    },
    {
        id: '8',
        title: 'Sustainable Travel Guide',
        slug: 'sustainable-travel-guide-eco-tourism',
        category: 'Travel',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
        author: 'Globe Trotter',
        date: '2d ago',
        content: 'How to see the world without leaving a heavy footprint behind.'
    },
    {
        id: '9',
        title: 'Retro Gaming Nostalgia',
        slug: 'retro-gaming-nostalgia-16bit',
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
        author: '8-Bit Hero',
        date: '3d ago',
        content: 'Why 16-bit graphics still hold up in the age of 4K ray tracing.'
    }
];
