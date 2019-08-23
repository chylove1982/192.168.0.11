const isDev = process.env.NODE_ENV !== 'production'

const config = {
  baseUrl: 'http://120.25.58.136:62222/api/'
}

// 开发模式
if (isDev) {
  config.baseUrl = 'http://120.25.58.136:62222/api/'
}
export default config
