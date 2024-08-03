import { updateList } from '../lib/slices/listSlice';
import { updatePagination } from '../lib/slices/paginationSlice';
import { wrapper } from '../lib/store';
import { starTrekApi } from '../services/ST-API/api';

export const gSSP = wrapper.getServerSideProps((store) => async (context) => {
  let newQuery = context.query.search ? context.query.search[0] : '';
  if (newQuery === 'detail') newQuery = '';
  const newPage = Number(context.query.page) - 1 || 0;

  const { data } = await store.dispatch(
    starTrekApi.endpoints.searchForObjects.initiate({ query: newQuery, page: newPage })
  );

  if (data) {
    store.dispatch(updatePagination(data.page));
    store.dispatch(updateList(data.astronomicalObjects));
  }

  let detailData = null;
  if (context.query.details) {
    const newDetail = context.query.details as string;
    const result = await store.dispatch(starTrekApi.endpoints.getObjectById.initiate(newDetail));
    detailData = result.data;
  }

  return {
    props: {
      detailData,
    },
  };
});
