import { getProps } from '../services/ST-API/routerApi';
import { makePageQuery } from '../utils/makePageQuery';
import { Props, SearchParams } from './globalTypes';
import MainPage from './main-page';

async function searchData({ query, page, details }: Props) {
  return getProps({ query, page, details });
}

export default async function HomePage({ params, searchParams }: SearchParams) {
  const queryParams = makePageQuery({ params, searchParams });
  const { mainData, detailData } = await searchData(queryParams);

  return (
    <MainPage
      listProps={mainData.astronomicalObjects}
      paginationProps={mainData.page}
      detailData={detailData}
    />
  );
}
