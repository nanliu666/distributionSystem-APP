/**
 * @author:yueq
 * @date 2018/8/23
*/
import axios from 'axios'


// 微信端登录 post
function dologin(params) {
  return axios.post('/account/login',params)
}

// 微信端登录 post
function logout_wx() {
  return axios.post('/logout_wx',)
}

export default {
  dologin,
  logout_wx,
}
