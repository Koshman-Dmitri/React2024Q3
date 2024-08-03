import { DetailList } from '../../components';
import { ApiElement } from '../../services/ST-API/api.types';
import { gSSP } from '../../utils/gSSP';

export const getServerSideProps = gSSP;

function PageWithSearch({ detailData }: { detailData: { astronomicalObject: ApiElement } }) {
  return detailData && <DetailList data={detailData} />;
}

export default PageWithSearch;
