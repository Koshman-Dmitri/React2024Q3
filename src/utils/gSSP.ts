import { wrapper } from '../lib/store';
import { starTrekApi } from '../services/ST-API/api';
import { ApiElement, ApiPagination } from '../services/ST-API/api.types';

export interface RenderProps {
  listProps: ApiElement[];
  paginationProps: ApiPagination;
  detailData: { astronomicalObject: ApiElement };
}

export const gSSP = wrapper.getServerSideProps((store) => async (context) => {
  let newQuery = context.query.search ? context.query.search[0] : '';
  if (newQuery === 'detail') newQuery = '';
  const newPage = Number(context.query.page) - 1 || 0;

  const { data } = await store.dispatch(
    starTrekApi.endpoints.searchForObjects.initiate({ query: newQuery, page: newPage })
  );

  let detailData = null;
  if (context.query.details) {
    const newDetail = context.query.details as string;
    const result = await store.dispatch(starTrekApi.endpoints.getObjectById.initiate(newDetail));
    detailData = result.data;
  }

  return {
    props: {
      listProps: data?.astronomicalObjects,
      paginationProps: data?.page,
      detailData,
    },
  };
});
