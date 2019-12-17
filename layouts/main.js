import Head from 'next/head';

import Main from '../components/Main';

const { HOST, SITE_NAME, CSS_VARIABLES } = require('../config');

const DEFAULT_OPTIONS = {
  title: SITE_NAME,
  description:
    '',
  type: 'website',
  image: `https://${HOST}/static/seo/og-default.jpg`,
  imageAlt: 'Illustration Ma Road'
};

const MainLayout = ({ children, ...opts }) => {
  const { title, description, type, image, imageAlt, structuredData } = {
    ...DEFAULT_OPTIONS,
    ...opts
  };

  const globalStructuredData = [
    {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      description: DEFAULT_OPTIONS.description,
      url: `https://${HOST}`,
      sameAs: [
        'https://www.facebook.com//',
        'https://www.instagram.com//',
        'https://twitter.com//',
        'https://www.youtube.com/',
        'https://www.linkedin.com/company//'
      ],
      logo: `https://${HOST}/static/favicon-512.png`,
      email: 'bonjour@.com'
    }
  ];

  const structured = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
      representativeOfPage: true,
      caption: imageAlt
    },

    ...structuredData
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />

        <meta name="application-name" content={DEFAULT_OPTIONS.title} />
        <link rel="icon" href={`https://${HOST}/static/favicon.ico`} />
        <link
          rel="icon"
          type="image/png"
          href={`https://${HOST}/static/favicon.png`}
        />
        <link rel="apple-touch-icon" href="static/favicon.png" />
        <link rel="apple-touch-startup-image" href="static/favicon.png" />
        <link
          rel="shortcut icon"
          type="image/png"
          href={`https://${HOST}/static/favicon.png`}
        />
        <link rel="manifest" href={`/static/manifest.json`} />

        {opts.path !== undefined &&
        opts.path !== null &&
        opts.path.slice(0, 11) === 'recrutement' &&
        opts.path.length > 12 ? (
          <link rel="canonical" href={`https://${HOST}/${opts.path}`} />
        ) : null}

        <meta name="theme-color" content={CSS_VARIABLES.primary} />

        <title>{title}</title>
        <meta name="description" content={description} />

        <meta key="twitter-title" name="twitter:title" content={title} />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={description}
        />
        <meta key="twitter-image" name="twitter:image" content={image} />
        <meta
          key="twitter-image-alt"
          name="twitter:image:alt"
          content={imageAlt}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={imageAlt} />
      </Head>

      <Main>
        {children}


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData)
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured)
          }}
        />
      </Main>
    </>
  );
};

export default MainLayout;
