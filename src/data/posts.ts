export interface Post {
    id: string;
    thumbnail: string;
    articleUrl: string;
    title: string;
    content?: string;
}

// Mock Data mimicking @realpettymay0 style (Celebrity Gossip/News)
// Using placeholder images for now.
export const POSTS: Post[] = [
    {
        id: '1',
        thumbnail: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=60', // Code/Tech placeholder -> Swap for celebrity
        title: 'Breaking: New Album Drops Tonight!',
        articleUrl: 'https://usweekly.com/news/album-drop',
        content: `In a stunning surprise move that has sent shockwaves through the music industry, the highly anticipated sophomore album "Midnight Echoes" is set to drop at midnight tonight. 

    Sources close to the artist suggest this project marks a radical departure from their previous pop-centric sound, embracing a darker, more industrial aesthetic. "It's not just an album; it's a confession," one insider claim. 

    Fan theories have been running wild since the cryptic "Blackout" post on Instagram three days ago. Audio engineers who analyzed the snippet claim the waveform contains a hidden date, which has now been confirmed. 
    
    The lead single, rumored to be titled "Ghost in the Machine," features a collaboration with an undisclosed grim artist. Industry analysts predict this could be the biggest opening week of the year, potentially dethroning the current chart-topper. Stand by for the full tracklist reveal at 11 PM.`
    },
    {
        id: '2',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
        title: 'Spotted: You wont believe who was seen together',
        articleUrl: 'https://usweekly.com/news/spotted',
        content: `The rumors are true. After months of subtle social media interactions and denied reports, the pop princess and the indie film darling were spotted leaving Nobu Malibu hand-in-hand last night.

    Witnesses describe the pair as "inseparable" and "clearly smitten," with one patron noting they spent the entire dinner huddled in a corner booth, ignoring their food. This public outing confirms the speculation that ignited earlier this month when they were tagged in the same location in Paris.

    But what does this mean for their exes? Sources say the breakup timelines are a bit... murky. "There was definitely some overlap," a friend of the ex-boyfriend claims. "He's not happy about seeing this all over the news."

    As the internet dissects every pixel of the paparazzi photos, one thing is certain: this is the power couple of the summer. expect a joint red carpet appearance sooner rather than later.`
    },
    {
        id: '3',
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60',
        title: 'Top 10 Trends of the Week',
        articleUrl: 'https://usweekly.com/style/trends',
        content: `From micro-skirts to oversized blazers, this week's fashion landscape is a study in contrasts. Here is the definitive ranking of what's hot right now:

    1. **Chrome Everything**: Inspired by the recent sci-fi blockbuster, silver and metallic accents are dominating street style.
    2. **The Return of Low-Rise**: Love it or hate it, the early 2000s silhouette is back with a vengeance.
    3. **Neon Eyeliners**: Minimalist makeup is out; bold, electric graphic liners are in.
    4. **Platform Loafers**: The chunky shoe trend shows no signs of slowing down.
    5. **Upcycled Denim**: Sustainability meets style with patchwork jean jackets becoming a staple.

    "It's about expressing chaos through structure," says fashion editor Miranda Priestly (not really). If you aren't wearing at least one of these items, are you even dressing?`
    },
    {
        id: '4',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
        title: 'Exclusive Interview: "I kept the secret for years"',
        articleUrl: 'https://usweekly.com/interview',
        content: `In a candid and emotional sit-down, the star of the hit series "Shadowplay" finally opens up about the controversy that nearly ended their career. 

    "I was told to stay silent. They said it would ruin the show," they admitted, fighting back tears. "But living a lie was eating me alive." The actor reveals for the first time the pressure from the studio to hide their relationship with a co-star, a narrative that conflicted with their on-screen rivalry.

    The interview also touches on their mental health struggles during the filing of Season 3. "I would go to my trailer and just scream into a pillow. Then I'd get a knock on the door, wipe my face, and go be a hero."

    This revelation casts a new light on the sudden departure of the showrunner last year. It wasn't "creative differences"—it was a stand for integrity. Read the full transcript below.`
    },
    {
        id: '5',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
        title: 'Red Carpet Looks: Best & Worst Dressed',
        articleUrl: 'https://usweekly.com/style/red-carpet',
        content: `The Met Gala might be months away, but last night's Awards didn't disappoint. 

    **BEST DRESSED:**
    *   **Zendaya in Vintage Versace**: Stunning. Flawless. No notes. The emerald green gown hugged every curve and the matching jewelry was the chef's kiss.
    *   **Timothée in Haider Ackermann**: Leaving the shirt at home? A bold move that paid off. The internet is broken.

    **WORST DRESSED:**
    *   **Jared Leto's "Cat" Costume**: We get it, you're method. But this was just... fur everywhere.
    *   **The "Naked Dress" Fatigue**: It's 2026. Can we please move past the sheer mesh with critical placement? It's been done.

    The real winner of the night? The unknown designer behind the avant-garde structured pieces worn by the best new artist nominees. Fashion follows the youth.`
    },
    {
        id: '6',
        thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',
        title: 'Who Wore It Better?',
        articleUrl: 'https://usweekly.com/style/who-wore-it-better'
    },
    {
        id: '7',
        thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=60',
        title: 'The Truth Revealed',
        articleUrl: 'https://usweekly.com/news/truth'
    },
    {
        id: '8',
        thumbnail: 'https://images.unsplash.com/photo-1504384308090-c54be643fc61?w=800&auto=format&fit=crop&q=60',
        title: 'Vacation Vibes',
        articleUrl: 'https://usweekly.com/lifestyle/vacation'
    },
    {
        id: '9',
        thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
        title: 'Backstage Pass',
        articleUrl: 'https://usweekly.com/music/backstage'
    }
];

export const fetchPosts = async (): Promise<Post[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(POSTS), 500);
    });
};
