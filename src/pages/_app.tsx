import { AuthProvider } from '@/features/auth';
import withAuth from '@/hocs/withAuth';
import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const AuthenticatedComponent = withAuth(Component);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position={'bottom-right'} />
        <AuthenticatedComponent {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
