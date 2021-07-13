export const emailPattern = /^\w+@\w+\.\w+(\.\w+)?$/;
// 运行环境配置项
let settings;
export function getSettings() {
  return settings;
}
export function setSettings(val) {
  settings = val;
}
