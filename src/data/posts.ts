export interface Post {
    id: string;
    title: string;
    thumbnail: string;
    articleUrl: string; // Keep for fallback or external sharing
    content?: string;   // Internal article content
}

export const fetchPosts = async (): Promise<Post[]> => {
    // 1. Get Custom Posts from LocalStorage
    const saved = localStorage.getItem('custom_posts');
    const customPosts: Post[] = saved ? JSON.parse(saved) : [];

    // 2. Return merged list (Custom first)
    return [...customPosts, ...STATIC_POSTS];
};

const STATIC_POSTS: Post[] = [
    {
        id: '1',
        title: 'Disney Evil Queen Fired',
        thumbnail: '/evil_queen.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Sabrina Von B, the viral "Evil Queen" performer at Disney, has reportedly been fired after an impressive 8-year run. 🍎👑

Known for her sharp wit and icy interactions that fans absolutely loved, Sabrina breathed new life into the classic villain character, becoming a social media sensation in the process.

Videos of her roasting guests went viral on TikTok regularly, drawing crowds specifically to see her. However, rumors are swirling that management felt her character work strayed too far from the strict brand guidelines.

"I gave my soul to this character," sources close to the performer say. Fans are already starting petitions to bring her back, but Disney remains silent on the specific reasons for her sudden departure.

Is this the end of the reign for Disney's sassiest villain? Or just the beginning of Sabrina's next chapter? 👀`
    },
    {
        id: '2',
        title: 'Kiefer Sutherland Arrested',
        thumbnail: '/kiefer.png',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Breaking: Actor Kiefer Sutherland has been arrested for an alleged assault on a rideshare driver. 🚨

Details are still emerging, but reports indicate a heated altercation took place late last night. The "24" star was reportedly taken into custody at the scene.

Witnesses claim the dispute began over a route disagreement and escalated quickly. If convicted, this could spell serious legal trouble for the veteran actor.

Sutherland's reps have yet to comment. This isn't his first run-in with the law, but it could be the most damaging to his career yet. Stay tuned for updates as the police report is released.`
    },
    {
        id: '3',
        title: 'Trump Flips Off Ford Worker',
        thumbnail: '/trump_flip.png',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Things got HEATED at the Ford plant today. Former President Trump was caught on camera appearing to flip off a worker who shouted "Pedophile Protector" at him during his tour. 🖕🇺🇸

The incident happened as Trump was walking the floor. The heckler's shout was audible, and Trump's reaction was immediate and visible.

Supporters say he was defending himself against a baseless slur; critics are calling it unpresidential behavior. The photo is already circulating everywhere online.

It's clear the campaign trail is going to be messier than ever.`
    },
    {
        id: '4',
        title: 'Ford Worker Suspended',
        thumbnail: '/ford_worker.png',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `The Ford worker who shouted at Donald Trump has been suspended. 🛑

Following the viral interaction where the employee called Trump a "Pedophile Protector," Ford management took swift action, removing the worker from the floor pending an investigation.

"We have a zero-tolerance policy for harassment," a spokesperson stated. However, union reps are already pushing back, claiming it was an exercise of free speech.

The worker is becoming a folk hero to some circles online, while others are calling for his permanent termination. Was this a fireable offense? 👇`
    },
    {
        id: '5',
        title: 'Kristy Scott Files for Name Change',
        thumbnail: '/kristy.png',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `It's officially over. Kristy Scott has filed legal docs to drop Desmond's surname amid their ongoing divorce proceedings. 💍💔

The filing signals there is absolutely no turning back. Kristy is looking to reclaim her identity and brand independent of her marriage.

Fans have watched the relationship crumble publicly over the last few months, but this legal move is the final nail in the coffin.

Sources close to Kristy say she is "relieved" and ready to move forward. "She wants a clean slate," the insider confirmed. What do we think of her new chapter? ✨`
    },
    {
        id: '6',
        title: 'Bethenny Frankel Battles Infection',
        thumbnail: '/bethenny.png',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Bethenny Frankel's St. Barths NYE trip took a scary turn. 🌴🚑

The former RHONY star shared graphic photos of a severe facial infection she contracted while on vacation. "My entire face broke out in a rash with pus-y bumps," she revealed on TikTok.

Frankel speculated the infection came from hotel linens, vowing to "never, ever" use them again. Medical experts, however, suggest it's likely bacterial folliculitis or contact dermatitis, shutting down wilder online rumors.

Despite the health scare and the tragic loss of her friend Jasen Kaplan during the trip, Bethenny tried to salvage the holiday with her daughter. But this "dream vacation" definitely had a nightmare ending.`
    },
    {
        id: '7',
        title: 'Viral Stranger Things Theory',
        thumbnail: '/stranger_things.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `A new 'Stranger Things' fan theory is breaking the internet. 🕰️🔦

Eagle-eyed fans have spotted clues that suggest a SECRET episode might drop before the final season. The theory hinges on a series of cryptic timestamps found in the latest teaser trailer.

"It builds a bridge between the time jump," one viral Reddit thread claims. Netflix has neither confirmed nor denied the rumors, which is only fueling the hype train.

Could the Duffer Brothers be planning one last surprise? Or is this just mass hysteria from a fandom starving for content? Stay tuned.`
    },
    {
        id: '8',
        title: 'Heartbreak: Advocate Passes Away',
        thumbnail: '/midwife.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Tragedy strikes the maternal health community. 💔

Dr. Janell Green Smith, a beloved 31-year-old midwife and fierce advocate for Black maternal health, has passed away due to complications during her own labor.

Known as the "Loc'd Midwife," Dr. Green Smith dedicated her life to fighting the very disparities that ultimately claimed it. Her passing is being mourned as a "profound failure of the system" by the American College of Nurse-Midwives.

She is survived by her husband and newborn baby, Eden. A devastating loss for a community she fought so hard to protect.`
    },
    {
        id: '9',
        title: 'ICE Agents Spark Outrage',
        thumbnail: '/ice_agents.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `Outrage in Minnesota after ICE agents reportedly dined at a local Mexican restaurant... only to return hours later to raid it. 🌮🚓

Witnesses in Willmar, MN claim four agents enjoyed lunch at "El Tapatio" in the afternoon. Later that evening, around closing time, they returned to arrest three workers.

The incident has shaken the local community, with bystanders criticizing the move as particularly callous. "They ate the food and then arrested the hands that made it," one resident posted.

This comes amidst a spike in ICE activity in the region, causing panic among immigrant-owned businesses.`
    }
];
