import { Props, SearchParams } from '../app/globalTypes';

export const makePageQuery = ({ params, searchParams }: SearchParams): Props => {
  let query = params.slug ? params.slug[0] : '';
  if (query === 'detail') query = '';

  const page = Number(searchParams.page) - 1 || 0;
  const details = (searchParams.details as string) || undefined;

  return { query, page, details };
};
