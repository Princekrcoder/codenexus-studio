import { Helmet } from "react-helmet-async";

const SEO = ({
    title = "CodeNexus Studio | Web Development, Web Apps & E-commerce",
    description = "CodeNexus Studio (Mohali, Punjab) builds fast, scalable websites, web applications, e-commerce platforms, portfolios and provides tech consulting for startups and businesses.",
    canonical = "https://codenexusstudio.vercel.app/",
    ogImage = "/og-image.png",
}) => {
    // ✅ Replace these when social links are ready
    const SOCIAL_LINKS = [
        "https://www.linkedin.com/in/princekrcoder", // later
        "https://github.com/princekrcoder", // later
        "https://www.instagram.com/princekrcoder", // later
        "https://twitter.com/princekrcoder", // later
    ];

    const schemaOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CodeNexus Studio",
        alternateName: ["CodeNexus", "CodeNexus Studio"],
        url: "https://codenexusstudio.vercel.app/",
        email: "codenexusstudio@gmail.com",
        telephone: "+918092701770",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mohali",
            addressRegion: "Punjab",
            postalCode: "140413",
            addressCountry: "IN",
        },

        // ✅ Brand authority (helps brand keyword ranking)
        founder: {
            "@type": "Person",
            name: "PrinceKRCoder",
            url: "https://codenexusstudio.vercel.app/",
        },

        sameAs: SOCIAL_LINKS,
    };

    const schemaLocalBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "CodeNexus Studio",
        alternateName: ["CodeNexus", "CodeNexus Studio"],
        url: "https://codenexusstudio.vercel.app/",
        telephone: "+918092701770",
        email: "codenexusstudio@gmail.com",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mohali",
            addressRegion: "Punjab",
            postalCode: "140413",
            addressCountry: "IN",
        },

        // ✅ for “PrinceKRCoder” search ranking
        founder: {
            "@type": "Person",
            name: "PrinceKRCoder",
        },

        areaServed: ["IN", "US", "CA", "GB"],
        knowsAbout: [
            "Web Development",
            "Web Applications",
            "E-commerce Development",
            "Portfolio Websites",
            "Tech Consulting",
        ],

        sameAs: SOCIAL_LINKS,
    };

    return (
        <Helmet>
            {/* ✅ Primary SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* ✅ Keyword Boost for brand search */}
            <meta
                name="keywords"
                content="codenexus, codenexus studio, princekrcoder, web development mohali, web development punjab, web applications, e-commerce development, portfolio websites, tech consulting"
            />

            {/* Recommended */}
            <meta name="robots" content="index,follow" />
            <meta name="theme-color" content="#050505" />

            {/* ✅ Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="CodeNexus Studio" />
            <meta property="og:locale" content="en_IN" />

            {/* ✅ Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* ✅ Schema Markup */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrganization)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(schemaLocalBusiness)}
            </script>
        </Helmet>
    );
};

export default SEO;
