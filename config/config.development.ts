// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

const HOST = {
  后台A: 'http://172.20.50.142:1818',
  后台B: '此处为后台B服务器地址',
};

export default defineConfig({
  define: {
    'process.env.BASE': '',
    'process.env.NAME': 'development',
    'process.env.HOST': HOST.后台A,
  },
});
