/*
 * @Description: 项目配置文件
 * @Author: tangguowei
 * @Date: 2021-12-10 15:16:00
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 17:36:43
 */
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
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
