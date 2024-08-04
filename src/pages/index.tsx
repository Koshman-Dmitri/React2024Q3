import { DetailList, Main } from '../components';
import { gSSP, RenderProps } from '../utils/gSSP';

export const getServerSideProps = gSSP;

export default function Page({ listProps, paginationProps, detailData }: RenderProps) {
  return (
    <Main listProps={listProps} paginationProps={paginationProps}>
      {detailData && <DetailList data={detailData} />}
    </Main>
  );
}
