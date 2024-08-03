import { DetailList } from '../components';
import { ApiElement } from '../services/ST-API/api.types';
import { gSSP } from '../utils/gSSP';

export const getServerSideProps = gSSP;

export default function Page({ detailData }: { detailData: { astronomicalObject: ApiElement } }) {
  return detailData && <DetailList data={detailData} />;
}
