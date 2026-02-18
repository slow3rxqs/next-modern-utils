import React from 'react';
import CommandPalette from './components/CommandPalette';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
          <CommandPalette />
      </body>
    </html>
  );
}