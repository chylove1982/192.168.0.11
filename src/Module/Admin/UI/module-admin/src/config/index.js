const isDev = process.env.NODE_ENV !== 'production'

const config = {
    baseUrl: '/api/'
}

// 开发模式
if (isDev) {
    config.baseUrl = 'http://www.temiicore.cn:6220/api/'
}

export default config
