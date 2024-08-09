import { LoaderFunctionArgs } from '@remix-run/node';

export interface Props {
  query: string;
  page: number;
  details?: string;
}

export const makePageQuery = ({ request, params }: LoaderFunctionArgs): Props => {
  let query = params['*'] || '';
  if (query.includes('/')) {
    const queryArr = query.split('/')[0];
    query = queryArr;
  }
  if (query === 'detail') query = '';

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) - 1 || 0;

  const details = searchParams.get('details') || undefined;

  return { query, page, details };
};
