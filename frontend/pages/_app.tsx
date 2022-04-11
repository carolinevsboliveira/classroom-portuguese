import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/contexts';
import { QueryClient, QueryClientProvider } from 'react-query';
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
