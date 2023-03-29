import { request } from 'umi';

// 获取列表
export async function queryList(params: any) {
  return request('/xxx', {
    params,
  });
}

// 新建
export async function create(data: any) {
  return request('/xxx', {
    method: 'POST',
    data,
  });
}

// 编辑
export async function edit(data: any) {
  return request('/xxx', {
    method: 'POST',
    data,
  });
}

// 详情
export async function queryDetail(param?: any) {
  return request('/xxx', {
    param,
  });
}


// 删除
export async function deleteItem(data: any) {
  return request('/xxx', {
    method: 'POST',
    data,
  });
}
