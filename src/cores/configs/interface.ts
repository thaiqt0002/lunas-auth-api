import config from './index'

const data = config()
export interface IConfig extends Record<keyof typeof data, string> {}
