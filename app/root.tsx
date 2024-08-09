import { Outlet, Links, Scripts } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Provider } from 'react-redux';
import App from '../src/App';
import { ThemeProvider } from '../src/context/ThemeContext';
import { setupStore } from '../src/app/store';
import globalStylesUrl from '../src/index.css';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>STAPI</title>
        <Links />
      </head>
      <body>
        <div id="root">
          <Provider store={setupStore()}>
            <ThemeProvider>
              <App>
                <Outlet />
              </App>
            </ThemeProvider>
          </Provider>
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: globalStylesUrl },
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
];
