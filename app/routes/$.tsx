import { LoaderFunctionArgs } from '@remix-run/node';
import { makePageQuery } from '../../src/utils/makePageQuery';
import { getProps } from '../../src/services/ST-API/routerApi';
import MainPage from './_index';

export const loader = async ({ request, params, context }: LoaderFunctionArgs) => {
  const { query, page, details } = makePageQuery({ request, params, context });
  return getProps({ query, page, details });
};

export default MainPage;
