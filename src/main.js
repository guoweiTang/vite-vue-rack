import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import installElementPlus from './plugins/element';
import store from './store';
import axios from 'axios';
import { setSettings } from './config';

const url =
    import.meta.env.DEV
    ? 'settings.json'
    : 'settings-pro.json';
axios(url)
  .then(({ data }) => {
    setSettings(data);

    const app = createApp(App);
    installElementPlus(app);
    app.use(router).use(store).mount('#app');
  })
  .catch((e) => {
    console.error(e);
    alert('运行环境参数获取失败！');
  });
