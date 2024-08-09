import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { makePageQuery } from '../../src/utils/makePageQuery';
import { getProps } from '../../src/services/ST-API/routerApi';
import { DetailList, Loader, Main } from '../../src/components';

export const loader = async ({ request, params, context }: LoaderFunctionArgs) => {
  const { query, page, details } = makePageQuery({ request, params, context });
  return getProps({ query, page, details });
};

function MainPage() {
  const { mainData, detailData } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <Main listProps={mainData.astronomicalObjects} paginationProps={mainData.page}>
      {detailData && <DetailList data={detailData} />}
      {navigation.state === 'loading' && <Loader />}
    </Main>
  );
}

export default MainPage;
