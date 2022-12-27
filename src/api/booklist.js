import request from '@/utils/request'


export const fetchList = (params) => {
  return request({
    params,
    url: '/booklist/list',
    method: 'get'
  })
}

export const fetchById = (params) => {
  return request({
    params,
    url: '/booklist/getById',
    method: 'get'
  })
}

export const update = (params) => {
  return request({
    url: '/booklist/updateBooklist',
    data: {
      ...params
    },
    method: 'post'
  })
}

export const del = (params) => {
  return request({
    params,
    url: '/booklist/del',
    method: 'get'
  })
}