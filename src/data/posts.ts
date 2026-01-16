export interface Post {
    id: string;
    title: string;
    thumbnail: string;
    articleUrl: string; // Keep for fallback or external sharing
    content?: string;   // Internal article content
}

export const fetchPosts = async (): Promise<Post[]> => {
    // Simulating an API call
    return [
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
            title: 'Celebrity spotted in NYC',
            thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
            articleUrl: 'https://likeshop.me/usweekly',
            content: `New York City sighting! 👀

A top A-lister was just spotted grabbing coffee in SoHo, trying to keep a low profile. Dressed in oversized shades and a trench coat, they almost fooled the paparazzi—but not quite.

Who do you think it is? Let us know in the comments! 👇`
        },
        {
            id: '7',
            title: 'Royal Family Update',
            thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
            articleUrl: 'https://likeshop.me/usweekly',
            content: `The Palace has released a new statement regarding the upcoming tour. 👑

Amidst rumors of tension, the Royal Family is putting on a united front. The schedule includes stops in three major commonwealth nations.

Will this tour repair the public image, or is the damage already done?`
        },
        {
            id: '8',
            title: 'Award Show Highlights',
            thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
            articleUrl: 'https://likeshop.me/usweekly'
        },
        {
            id: '9',
            title: 'New Album Release',
            thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
            articleUrl: 'https://likeshop.me/usweekly'
        }
    ];
};
