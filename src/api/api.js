import request from '@/utils/request'

export function cosuploadImg(params) {
    return request({
      url: '/api/cos/upload',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }


  export function cosdelloadImg(params) {
    return request({
      url: '/api/cos/delload',
      method: 'post',
      data: params,
    })
  }