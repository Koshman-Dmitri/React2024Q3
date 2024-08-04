'use client';

import { DetailList, Main } from '../components';
import { RenderProps } from '../services/ST-API/routerApi';

export default function MainPage({ listProps, paginationProps, detailData }: RenderProps) {
  return (
    <Main listProps={listProps} paginationProps={paginationProps}>
      {detailData && <DetailList data={detailData} />}
    </Main>
  );
}
