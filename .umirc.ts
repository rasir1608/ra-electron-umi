import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  publicPath: './',
  outputPath: 'dist/renderer',
  webpack5: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
