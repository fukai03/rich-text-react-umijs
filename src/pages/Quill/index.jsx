import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';

const QuillEditor = () => {
  const [value, setValue] = useState('<p>初始内容</p>');

  const modules = {
    // 设置菜单选项
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  // 配置功能, 若配置菜单选项而没配置功能，则对应按钮就会没有对应的功能
  // 如下面删除 bold ，则点击加粗按钮文本并不会加粗
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'direction',
    'align',
    'background',
    'color',
    'font',
    'link',
    'image',
    'video',
  ];
  const editorStyle = {
    height: '80vh',
    background: '#fff',
  };

  const onChange = (content, delta, source, editor) => {
    console.log('onChange');
    setValue(content);
  };
  const onChangeSelection = (range, source, editor) => {
    console.log('onChangeSelection');
  };
  const onFocus = (range, source, editor) => {
    console.log('onFocus');
  };
  const onBlur = (previousRange, source, editor) => {
    console.log('onBlur');
  };
  const onKeyPress = (e) => {
    console.log('onKeyPress');
  };
  const onKeyDown = (e) => {
    console.log('onKeyDown');
  };

  return (
    <PageContainer>
      <ReactQuill
        theme="snow"
        style={editorStyle}
        value={value}
        onChange={onChange}
        onChangeSelection={onChangeSelection}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </PageContainer>
  );
};
export default QuillEditor;
