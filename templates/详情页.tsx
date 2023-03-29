import { PageContainer } from '@ant-design/pro-layout';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useLoadingRequest } from '@/be-common/src/hooks';
import { useParams } from 'umi';
import { queryDetail } from './接口文件';

const <%= pageName %>: React.FC<any> = () => {
  const { id } = useParams<any>();
  const [loading, data] = useLoadingRequest(() => queryDetail(id), []);
  console.log('data', data);
  return (
    <PageContainer title="详情">
      <ProCard headerBordered loading={loading} title={data?.title}>
        <ProDescriptions dataSource={data}>
          <ProDescriptions.Item label="创建人" dataIndex="author" />
          <ProDescriptions.Item label="创建时间" dataIndex="ctime" valueType="dateTime" />
        </ProDescriptions>
      </ProCard>
    </PageContainer>
  );
};

export default <%= pageName %>;
