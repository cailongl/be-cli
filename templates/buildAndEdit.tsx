import React, { useCallback, useState } from 'react'
import { ProCard } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Select, Form, message, Input } from 'antd'
import { history, useParams } from 'umi'
import { useLoadingRequest } from '@/be-common/src/hooks'

import { queryDetail, create, edit } from './service'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const <%= pageName %>: React.FC<any> = () => {
  const [form] = Form.useForm()
  const { id } = useParams<any>()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const [loading, data] = useLoadingRequest(
    () => (id ? queryDetail(id) : Promise.resolve({})),
    [],
  )

  const goBack = useCallback(() => {
    history.push('/xxxx')
  }, [])

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values......', values)
        setConfirmLoading(true)
        if (id) {
          return edit({ ...values, id })
        }
        return create(values)
      })
      .then(() => {
        message.success('操作成功！')
        goBack()
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  const footerBtn = [
    <Button key="cancel" onClick={() => goBack()}>
      取消
    </Button>,
    <Button
      key="submit"
      loading={confirmLoading}
      type="primary"
      onClick={onSubmit}
    >
      确定
    </Button>,
  ]

  return (
    <PageContainer loading={loading} onBack={() => goBack()} footer={footerBtn}>
      <ProCard title="基本配置" headerBordered>
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{
            ...data,
          }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请选择入参类型',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            rules={[
              {
                required: true,
                message: '请选择响应内容类型',
              },
            ]}
          >
            <Select placeholder="请选择类型">
              <Select.Option value="JSON">JSON</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </ProCard>
    </PageContainer>
  )
}

export default <%= pageName %>
