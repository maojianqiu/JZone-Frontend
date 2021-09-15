import request from '@/utils/request'

export function bloglist(params) {
    return request({
      url: '/bmsblog/bloglist',
      method: 'get',
      params: params
    })
  }