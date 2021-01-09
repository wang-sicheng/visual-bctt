import request from '@/utils/request'

export function getParams(params) {
  return request({
    url: '/vue-admin-template/visual/params',
    method: 'get',
    params
  })
}
