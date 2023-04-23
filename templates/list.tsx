import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Popconfirm, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history, Link } from 'umi';
import TableAction from '@/be-common/src/components/TableAction';
import { create, deleteItem, queryList } from './service';

type DataItemType = {
  id: string;
};

const <%= pageName %>: React.FC<any> = () => {
  const tableRef = useRef<any>();

  const onRemove = (id: string) => {
    deleteItem(id).then(() => {
      tableRef.current.reload();
    });
  };

  const columns: ProColumns<DataItemType>[] = [
    {
      title: 'id',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'acition',
      hideInSearch: true,
      width: 160,
      render: (_, record) => {
        return (
          <TableAction>
            <Link to={`detail/${record.id}`}>查看</Link>
            <Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(record.infoId)}>
              <a href="#">删除</a>
            </Popconfirm>
          </TableAction>
        );
      },
    },
  ];

  //table请求
  const getDataList = async (param: { [x: string]: any; pageSize: any }) => {
    try {
      const { pageSize, ...restParam } = param;
      const res = await queryList({ ...restParam, size: pageSize });
      return {
        data: res?.records || [],
        success: true,
        total: res?.total,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={tableRef}
        request={getDataList}
        rowKey="infoId"
        toolBarRender={() => [
          <Button
            onClick={() => {
              console.log('creat......')
            }}
            key="primary"
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
}

export default <%= pageName %>;
