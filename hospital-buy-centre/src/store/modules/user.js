import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  menus: [],
  buttons: [],
  menu: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_INTRODUCTION: (state, introduction) => {
  //   state.introduction = introduction
  // },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERID: (state, userID) => {
    state.userid = userID
  },
  SET_MENU: (state, userDetails) => {
    state.menu = userDetails
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 用户注册
  register({ commit }, userInfo) {
    const { phone, username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, phone: phone }).then(response => {
        const { data } = response
        data.accessToken = 'Bearer ' + data.accessToken
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password, pictureid, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ UserName: username.trim(), UserPassWords: password, APPID: 'SPD' }).then(response => {
        console.log('response', response)
        const { result } = response
        // result.accessToken = result.token
        commit('SET_TOKEN', result.token)
        setToken(result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token }).then(response => {
        const { result } = response

        console.log(result)

        if (!result) {
          reject('Verification failed, please Login again.')
        }

        const { userDetails, roleName, headerPic, userID } = result
        commit('SET_USERINFO',result)
        commit('SET_MENU', userDetails[0].subMenu)
        commit('SET_NAME', roleName)
        commit('SET_AVATAR', headerPic)
        commit('SET_USERID', userID)
        // commit('SET_INTRODUCTION', introduction)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_MENU', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MENU', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify menu
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { menus, buttons } = await dispatch('getInfo')

      var menu = []
      menus.forEach(item => {
        menu.push(item.id)
        if (item.children && item.children.length > 0) {
          const subIds = item.children.map(subItem => subItem.id)
          menu = menu.concat(subIds)
        }
      })

      menu = menu.concat(buttons)

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', menu, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
      console.log(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
