import request from '@/plugins/request'
export function goosList(query) {
  return request({
    url: 'getGoodsList',
    method: 'GET',
    params: query
  })
}
export function getConsultList(query) {
  return request({
    url: 'getConsultGoods',
    method: 'GET',
    params: query
  })
}