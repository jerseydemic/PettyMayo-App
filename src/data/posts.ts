export interface Post {
    id: string;
    title: string;
    thumbnail: string;
    articleUrl: string; // Keep for fallback or external sharing
    content?: string;   // Internal article content
    tweetId?: string;   // Optional Tweet Embed ID
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
        tweetId: '2010893597907058894',
        content: `**ST. BARTHS —** What was supposed to be a dream New Year's Eve getaway turned into a medical nightmare for reality TV mogul Bethenny Frankel, igniting a firestorm of online speculation and a personal vow to never trust hotel laundry again.

The former *Real Housewives of New York City* star, 53, took to TikTok and Instagram earlier this week to document a harrowing health scare that left her face covered in a painful, disfiguring rash. Frankel, usually known for her sharp wit and Skinnygirl empire, appeared vulnerable and visibly swollen in a series of "Get Ready With Me" videos that quickly pivoted from glamour to grime.

"My entire face broke out in a rash with pus-y bumps," Frankel candidly revealed to her millions of followers, showcasing close-up shots of her skin which appeared red, irritated, and dotted with white pustules. "It looks like I have a beard of acne," she joked darkly, though the severity of the situation was evident.

**The "Dirty Laundry" Theory**

Detailed in her typical rapid-fire delivery, Frankel recounted the timeline of events. She arrived in the luxury destination of St. Barths ready to ring in 2024 with her daughter, Bryn, and a group of friends. However, shortly after settling into her accommodations, the symptoms began.

Frankel is convinced the culprit lies in the housekeeping. "I'm never, ever using hotel laundry again," she declared, theorizing that industrial detergents or perhaps less-than-sanitary linens were to blame. "I washed my face with the hotel washcloth... and then this happened."

This isn't the first time Frankel has battled severe allergic reactions—she has a well-documented, life-threatening fish allergy—but this localized facial infection presented a new, confusing challenge. Fans immediately flooded her comments with theories ranging from bed bugs to an allergic reaction to a new skincare product, but Frankel remained steadfast in her belief that the environment was the trigger.

**Medical Experts Weigh In**

While Frankel pointed fingers at the linens, medical professionals observing the saga suggest a few possibilities. Dr. Joshua Zeichner, a dermatologist at Mount Sinai Hospital in New York (who has not treated Frankel personally), notes that such reactions are often "contact dermatitis" or "bacterial folliculitis."

"Bacterial folliculitis occurs when hair follicles become infected with bacteria," experts explain. "This can happen from shaving, friction from clothing, or yes, exposure to bacteria on shared surfaces like towels or pillowcases that haven't been properly sanitized."

St. Barths, while a playground for the rich and famous, is also a humid, tropical environment where bacteria thrive. Combined with the stress of travel and potential changes in water quality, skin barriers can be compromised, leaving even the most diligent skincare enthusiasts susceptible to infection.

**A Holiday Marred by Tragedy**

The skin infection was just one blow in what became a devastatingly difficult trip for Frankel. Just days before revealing her rash, she shared the heartbreaking news of the passing of her longtime friend and makeup artist, Jasen Kaplan.

Kaplan, who had been a staple in Frankel's glam squad for years, passed away unexpectedly, casting a pall over the holiday festivities. Frankel posted a moving tribute to him, calling him "one of the most talented people" she had ever known.

"To be dealing with this physical pain while my heart is breaking... it's a lot," Frankel admitted in a more somber update. Sources close to the star say she considered cutting the trip short but decided to stay for the sake of her daughter, trying to create some semblance of a normal holiday despite the dual challenges.

**The Aftermath and "Receipts"**

True to her brand, Frankel didn't just complain; she went into problem-solving mode. She documented her trip to a local pharmacy, showing off the array of French antibiotic creams and ointments she purchased to combat the outbreak. She also used the moment to educate her followers on travel hygiene, specifically advising people to pack their own pillowcases and avoid using hotel washcloths on sensitive areas.

As the swelling subsides, the internet debate rages on. Was it truly the laundry? A reaction to the humid climate? Or perhaps a stress-induced flare-up from the emotional toll of losing a friend? One thing is certain: Bethenny Frankel's "dream vacation" serves as a stark reminder that even in paradise, reality—and bacteria—can bite back hard.`
    },
    {
        id: '7',
        title: 'Viral Stranger Things Theory',
        thumbnail: '/stranger_things.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `**HAWKINS, IN —** The wait for *Stranger Things* Season 5 has driven the fandom into a frenzy, birthing one of the most elaborate and contentious theories in the show's history: The "Secret Episode" Theory, also known online as "Conformity Gate."

As the Duffer Brothers diligently work on the final installment of the sci-fi juggernaut, a vocal subset of fans has become convinced that what we saw in the Season 4 finale wasn't the whole story—and that a secret, feature-length episode is lurking in the shadows, waiting to drop before the Season 5 premiere.

**The Clues: A Trail of Digital Breadcrumbs**

The theory, which originated on Reddit and quickly spread to TikTok and Twitter, hinges on a series of cryptographic "clues" that eagle-eyed viewers claim to have spotted in promotional material and behind-the-scenes footage.

The primary evidence? Timestamps. In the most recent teaser trailer released by Netflix, a blink-and-you'll-miss-it sequence of numbers flashes on screen. While casual viewers dismissed it as aesthetic glitching, code-breaking fans argue the numbers correspond to a specific date and runtime.

"It builds a bridge between the time jump," argues one viral Reddit thread with over 15,000 upvotes. The user postulates that the massive time jump planned for Season 5 requires deeper explanation—a narrative gap that this secret episode would fill. "There is too much unexplained character development. They can't just jump 3 years without showing us the fallout of the earthquake."

**The "ChatGPT" Conspiracy**

Adding fuel to the fire is a screenshot from a recent "Making Of" video released by the Stranger Things Writers' Room account. In the background of a shot featuring Ross Duffer, fans noticed a browser tab that seemingly read "ChatGPT."

This innocuous detail spiraled into a conspiracy theory that the writers were using AI to generate script ideas, or—more wildly—that the "Secret Episode" itself deals with themes of artificial reality and simulation, tying into the nature of the Upside Down. "Is Hawkins even real? Or is it a simulation controlled by Vecna?" asks TikTok user @HellfireClubTruth.

**Netflix's Silence: Strategy or Confusion?**

Netflix, for its part, has maintained a frustrating radio silence. They have neither confirmed nor denied the rumors, a strategy that marketing experts say is likely intentional.

"This is engagement gold," says social media analyst Sarah Jenkins. "By letting the fans argue and speculate, they keep the show trending worldwide without spending a dime on advertising. Whether the episode exists or not almost doesn't matter; the hype *is* the product."

However, cast interviews have cast doubt on the theory. In a recent press junket, Millie Bobby Brown (Eleven) seemed genuinely confused when asked about a "hidden" chapter. "We filmed what we filmed," she stated, though she added a coy, "But the Duffers always have secrets."

**The "Conformity" Angle**

The name "Conformity Gate" comes from a leak—verified by no one—claiming the secret episode is titled "The Conformity." Thematically, this would fit with the show's exploration of Cold War paranoia and social pressure. Proponents argue this episode would focus on the town of Hawkins trying to "conform" to a new normal after the devastation of Season 4, ignoring the supernatural threat until it's too late.

Whether "The Conformity" is a masterpiece of guerrilla marketing or a mass delusion born of content starvation remains to be seen. But one thing is clear: the *Stranger Things* fandom is not ready to let go, and they will hunt for demogorgons in every shadow until the credits roll for the very last time.`
    },
    {
        id: '8',
        title: 'Heartbreak: Advocate Passes Away',
        thumbnail: '/midwife.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `**SPARTANBURG, SC —** The maternal health community is reeling today following the devastating news of the passing of Dr. Janell Green Smith, a 31-year-old certified nurse-midwife and fierce advocate who dedicated her life to saving Black mothers, only to succumb to the very disparities she fought against.

Dr. Green Smith, affectionately known to her clients and 40,000+ social media followers as the "Loc'd Midwife," passed away on January 2, 2026, due to severe complications during the birth of her first child, a daughter named Eden.

**A Cruel Irony**

The tragedy of Dr. Green Smith's death is compounded by her professional expertise. She held a Doctorate in Nursing Practice and specialized in perinatology, specifically focusing on the high mortality rates among Black women in the United States.

"She knew the stats better than anyone," said a former colleague at the Prisma Health Greenville Midwifery Care, where Janell practiced. "She would quote them in her sleep: Black women are three times more likely to die in childbirth than white women. She built her entire career on trying to change that number. For her to become part of that statistic... it's shattering."

According to reports, Dr. Green Smith developed severe pre-eclampsia late in her third trimester. Despite recognizing the symptoms and seeking care, complications escalated rapidly during labor, leading to an emergency C-section. While her daughter Eden was delivered safely, Janell suffered a ruptured incision site and subsequent hemorrhaging that doctors were unable to stem.

**"The System Failed Her"**

Her death has ignited a firestorm of grief and anger across the medical community. The American College of Nurse-Midwives issued a blistering statement, calling her passing "a profound failure of the systems meant to protect birthing people."

"It doesn't matter how educated you are, how much money you make, or even if you are a literal doctor of midwifery," wrote maternal health activist Latham Thomas on Instagram. "If this system can kill Janell—who knew exactly what to ask for, exactly what was happening to her body—then none of us are safe."

The Hive Impact Fund, a nonprofit Janell partnered with to provide doula services to low-income mothers, has announced a scholarship in her name. "Janell wasn't just a provider; she was a protector," said the Fund's director. "She created safe spaces where Black women felt heard, seen, and valued. We have lost a titan."

**A Legacy of Love and Light**

Beyond her advocacy, friends remember Janell as a vibrant soul who loved photography, her church, and her husband, Daiquan Smith. The couple had married just six months prior in a joyous ceremony that Janell had documented extensively on her blog.

"She was so ready to be a mother," Daiquan shared in a heartbreaking statement. "She had the nursery ready. She had read every book. She was supposed to be here to teach Eden everything."

A GoFundMe established to support Daiquan and baby Eden raised over $150,000 in just 24 hours, a testament to the lives Janell touched. But for many, the donations are a small comfort in the face of a loss that feels entirely preventable, and terrifyingly systemic.`
    },
    {
        id: '9',
        title: 'ICE Agents Spark Outrage',
        thumbnail: '/ice_agents.jpg',
        articleUrl: 'https://instagram.com/realpettymay0',
        content: `**WILLMAR, MN —** A quiet Tuesday afternoon in rural Minnesota has become the flashpoint for a national debate on immigration enforcement ethics after reports emerged that federal ICE agents dined at a family-owned Mexican restaurant mere hours before raiding it.

The incident occurred at "El Tapatio," a beloved local staple in Willmar, known for its authentic cuisine and close ties to the community. According to multiple eyewitness accounts and security footage reviewed by local advocates, a group of four Immigration and Customs Enforcement agents entered the establishment around 1:00 PM for lunch.

**"They Ate, They Tipped, They Returned"**

Waitstaff reported that the agents were polite, enjoyed a full meal, and even left a tip. "They seemed like normal customers," said one server, who asked to remain anonymous for fear of retaliation. "They joked with the host. They ate the food."

However, the tone shifted drastically seven hours later. Around 8:30 PM, as the kitchen was closing and staff were beginning their cleanup routines, the same group of agents—accompanied by additional uniformed officers—returned to the premises.

This time, there were no pleasantries. The agents reportedly executed a targeted enforcement action, entering the kitchen and detaining three undocumented workers who had been preparing food earlier that day.

**Community Backlash**

The news of the "dine-and-raid" tactic spread instantly through Willmar, a town with a significant Latino population. Residents gathered outside the restaurant the following morning in protest, holding signs that read "We Feed You, You Arrest Us" and "No Humans Are Illegal."

"It's psychological warfare," said local activist Maria Gonzales. "To sit there, look these people in the eye, eat the food they made with their hands, and then come back to rip them away from their families? It's chilling. It sends a message that you can't even feel safe serving your community."

The Lutheran Church across the street from the restaurant has opened its doors as a sanctuary for terrified families, many of whom are now keeping their children home from school, fearing further raids.

**Legal Gray Areas**

Legal experts note that while the optics are severe, the agents likely operated within the law. "If they had a valid warrant, they can execute it," explains immigration attorney David Hernandez. "However, the 'ruse' of dining there first—scoping out the layout, identifying targets while posing as customers—walks a fine ethical line. It erodes trust in law enforcement to a breaking point."

ICE has not released an official statement regarding the specific timeline of the Willmar operation, citing policy on commenting on ongoing investigations. However, a regional spokesperson confirmed that an "enforcement action" took place in Kandiyohi County targeting individuals with "outstanding removal orders."

For the owners of El Tapatio, the damage goes beyond the arrested staff. "Our business is empty today," the owner told reporters, tears in his eyes. "People are afraid to come in. They think if they sit down to eat, they might be next. How do you rebuild trust after that?"`
    }
];
