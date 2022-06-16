import request from '@/plugins/request'
export function openapi(query) {
  return request({
    url: 'getUserInfo',
    method: 'GET',
    params: query
  })
}
export function orderList(query) {
  return request({
    url: 'getOrderList',
    method: 'GET',
    params: query
  })
}