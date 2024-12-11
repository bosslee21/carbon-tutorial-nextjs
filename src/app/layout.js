// server-side layout
// Equivalent to App.tsx in your other project, but it’s more modular
// because layouts in Next.js 13 are hierarchical and scoped to
// specific parts of your app.

//
import './globals.scss';
import { Providers } from './providers';

export const metadata = {
  title: 'Carbon + Next13',
  description: 'IBM Carbon Tutorial with NextJS 13',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
