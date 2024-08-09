import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCloseDetails = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const closeDetails = () => {
    const page = queryParams.get('page') || '';
    const newPath = `${pathname.replace('/detail', '')}?page=${page}`.replace('/', '');

    router.push(`/${newPath}`);
  };

  return { closeDetails };
};
