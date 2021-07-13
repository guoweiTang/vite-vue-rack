/*
 * @Description: file content
 * @Author: tangguowei
 * @Date: 2021-07-08 16:36:12
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 18:09:33
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
    ]
  }
}
