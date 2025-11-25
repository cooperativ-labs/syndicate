export const conditionalMetadata =
  process.env.NEXT_PUBLIC_CLIENT === 'reizen'
    ? {
        name: 'ReiZen',
        short_name: 'ReiZen',
        icons: {
          icon: [
            {
              url: '/reizen/192x192.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ],
          apple: [{ url: '/reizen/192x192.png', sizes: '180x180' }],
          shortcut: ['/reizen/site-icon.png']
        },
        theme_color: '#ffffff',
        background_color: '#fff',
        display: 'standalone',
        manifest: '/reizen/site.webmanifest'
      }
    : {
        name: 'Cooperativ',
        short_name: 'Cooperativ Syndication Platform',
        icons: {
          icon: [
            { url: '/cooperativ/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/cooperativ/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
          ],
          apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
          shortcut: ['/cooperativ/site-icon.png']
        },
        theme_color: '#ffffff',
        background_color: '#fff',
        display: 'standalone',
        manifest: '/cooperativ/site.webmanifest'
      };
