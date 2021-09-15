import request from '@/utils/request'

export function fetchList(params) {
    return request({
      url: '/bgmsblog/bloglist',
      method: 'get',
      params: params
    })
  }

  export function createBlog(data) {
    return request({
      url: '/bgmsblog/blogadd',
      method: 'post',
      data: data
    })
  }

  export function updateBlog(data) {
    return request({
      url: '/bgmsblog/blogupdate',
      method: 'post',
      data: data
    })
  }

  export function getBlogInfo(id) {
    return request({
      url: '/bgmsblog/bloginfo/'+ id,
      method: 'get',
    })
  }