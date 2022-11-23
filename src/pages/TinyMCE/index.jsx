import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import { option, html } from './option';
import './index.css';

const TinyMCE = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(html);

  const log = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <PageContainer>
      <>
        <Editor
          apiKey="05tdi8d6n3rbw21yfwob56jj7fkyv3k80txd4z88eucpsisc"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={value}
          init={option}
        />
        <Button onClick={log} type="primary">
          打印富文本内容
        </Button>
      </>
    </PageContainer>
  );
};
export default TinyMCE;
