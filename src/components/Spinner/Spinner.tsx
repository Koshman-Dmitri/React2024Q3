import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';

function Spinner() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
    };
  }, [router]);

  return isLoading && <Loader />;
}

export default Spinner;
