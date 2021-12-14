/*
 * @Description: 项目配置文件
 * @Author: tangguowei
 * @Date: 2021-12-10 15:16:00
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-14 17:47:09
 */
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
    base: '/vue-rack-admin/',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    build: {
      chunkSizeWarningLimit: 1000,
    }
  }
}
