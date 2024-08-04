import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import StoreProvider from '../context/StoreProvider';
import { ThemeProvider } from '../context/ThemeContext';
import App from '../App';
import '../index.css';

export const metadata: Metadata = {
  title: 'STAPI',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <App>{children}</App>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
