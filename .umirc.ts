import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '富文本调研',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: 'wangEditor',
      path: '/WangEditor',
      component: './WangEditor',
    },
    {
      name: 'DraftJS',
      path: '/DraftJS',
      component: './DraftJS',
    },
    {
      name: 'SlateJS',
      path: '/SlateJS',
      component: './SlateJS',
    },
    {
      name: 'Quill',
      path: '/Quill',
      component: './Quill',
    },
    {
      name: 'TinyMCE',
      path: '/TinyMCE',
      component: './TinyMCE',
    },
    {
      name: 'ProseMirror',
      path: '/ProseMirror',
      component: './ProseMirror',
    },
    {
      name: 'wrod导入导出',
      path: '/ProseWordImportAndExportMirror',
      component: './WordImportAndExport',
    },
  ],
  npmClient: 'pnpm',
});
