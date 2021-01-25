import request from '@/utils/request'

export function getParams(params) {
  return request({
    url: '/vue-admin-template/visual/params',
    method: 'get',
    params
  })
}
// 获取某个交易的相关路径并画图 mock/trace.js
export function getTradeGraph(data) {
  return request({
    url: '/vue-admin-template/visual/trade',
    method: 'post',
    params: { data }
  })
}
// 获取某个地址的所有信息并画图 mock/trade.js
export function getAddressGraph(data) {
  return request({
    url: '/vue-admin-template/visual/address',
    method: 'post',
    params: { data }
  })
}
