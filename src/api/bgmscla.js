import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/classify/classifylist',
    method: 'get',
    params: params
  })
}

export function fetchInfo(blogId) {
  return request({
    url: '/classify/classifyInfo/'+blogId,
    method: 'get',
  })
}



export function createClassify(data) {
  return request({
    url: '/classify/classifyadd',
    method: 'post',
    data: data
  })
}

export function updateClassify(data) {
  return request({
    url: '/classify/classifyupdate',
    method: 'post',
    data: data
  })
}

export function deleteClassify(params) {
  return request({
    url: '/classify/classifydel',
    method: 'post',
    data:params,
  })
}


