import { defineConfig } from '@umijs/max';

// TODO: 本地运行请根据本机IP修改HOST地址
const HOST = {
  后台A: 'http://192.168.50.187:1919',
  后台B: '此处为后台B服务器地址',
};

export default defineConfig({
  define: {
    'process.env.BASE': '',
    'process.env.NAME': 'development',
    'process.env.HOST': HOST.后台A,
  },
});
