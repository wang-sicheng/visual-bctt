import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getAddrList(data) {
  return request({
    url: '/vue-admin-template/table/addressList',
    method: 'post',
    params: { data }
  })
}

export function getTrade(id) {
  return request({
    url: '/vue-admin-template/table/trade',
    method: 'post',
    id
  })
}

export function getAddress(id) {
  return request({
    url: '/vue-admin-template/table/address',
    method: 'post',
    id
  })
}
