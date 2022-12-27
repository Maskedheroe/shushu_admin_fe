import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/tradeinfo/list',
    method: 'get',
    params: {
      ...params
    }
  })
}

export function del(params) {
  return request({
    url: '/tradeinfo/del',
    method: 'post',
    data: {
      ...params
    }
  })
}
