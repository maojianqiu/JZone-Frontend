import request from '@/utils/request'


export function getAuthCode(telephone) {
  return request({
    url: '/sso/getAuthCode',
    method: 'get',
    params: telephone
  })
}

export function register(data) {
  return request({
    url: '/sso/register',
    method: 'post',
    data:data
  })
}

export function login(username, password) {
  console.log("--------------login-------")
  return request({
    url: '/sso/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/sso/info',
    method: 'get',
  })
}

export function updateMember(curmember) {
  return request({
    url: '/sso/updateMember',
    method: 'post',
    data:curmember
  })
}

export function logout() {
  return request({
    url: '/sso/logout',
    method: 'post'
  })
}

export function getMemeberInfo(id) {
  return request({
    url: '/sso/getMemeberInfo/'+ id,
    method: 'get'
  })
}