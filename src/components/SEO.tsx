import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    date?: string;
    author?: string;
}

export default function SEO({
    title,
    description,
    image = 'https://realpettymayo.com/app_icon.jpg',
    url = 'https://realpettymayo.com',
    type = 'website',
    date,
    author = 'Petty Mayo'
}: SEOProps) {
    const siteTitle = "Petty Mayo | Viral News & Culture";
    const fullTitle = title === "Petty Mayo" ? siteTitle : `${title} | Petty Mayo`;

    // Schema.org Structured Data (JSON-LD)
    const schemaData = type === 'article' ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title.substring(0, 110), // Max 110 chars recommended
        "image": [image],
        "datePublished": date || new Date().toISOString(),
        "dateModified": date || new Date().toISOString(),
        "author": [{
            "@type": "Organization",
            "name": author,
            "url": "https://realpettymayo.com"
        }]
    } : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Petty Mayo",
        "url": "https://realpettymayo.com",
    };

    return (
        <Helmet>
            {/* Standard Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Petty Mayo" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Google / Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
}
