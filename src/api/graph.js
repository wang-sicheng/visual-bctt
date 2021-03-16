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
// 获取某个地址的所有信息并画图 mock/trade.js
export function getNode(params) {
  return request({
    url: '/vue-admin-template/visual/node',
    method: 'get',
    params
  })
}
// 获取链可视化，以及链上信息可视化
export function getChain(params) {
  return request({
    url: '/vue-admin-template/visual/chain',
    method: 'get',
    params
  })
}
// 获取台州征信模型可视化
export function getModeTz(params) {
  return request({
    url: '/vue-admin-template/visual/taizhou',
    method: 'get',
    params
  })
}
// 获取苏州征信模型可视化
export function getModeSz(params) {
  return request({
    url: '/vue-admin-template/visual/suzhou',
    method: 'get',
    params
  })
}
