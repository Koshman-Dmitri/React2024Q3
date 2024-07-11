import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

type VoidFunc = () => void;

export const useCloseDetails = (): VoidFunc => {
  const [queryParams] = useSearchParams();
  const { search } = useParams();
  const navigate = useNavigate();

  return () => {
    const page = queryParams.get('page');
    const curSearch = search || '';
    navigate(`/${curSearch}?page=${page}`);
  };
};
