import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const useCloseDetails = () => {
  const [queryParams] = useSearchParams();
  const { search } = useParams();
  const navigate = useNavigate();

  const closeDetails = () => {
    const page = queryParams.get('page');
    const curSearch = search || '';
    navigate(`/${curSearch}?page=${page}`);
  };

  return { closeDetails };
};
