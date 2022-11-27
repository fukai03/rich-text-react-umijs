import React, { useState, useRef, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftJS = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = useCallback((editorState) => {
    console.log(editorState);
    setEditorState(editorState);
  }, []);
  const wrapperStyle = {
    border: '1px solid #ccc',
  };
  const editorStyle = {
    height: '400px',
    background: '#fff',
  };
  const toolbarStyle = {};

  return (
    <PageContainer>
      <Editor
        editorState={editorState}
        wrapperStyle={wrapperStyle}
        editorStyle={editorStyle}
        toolbarStyle={toolbarStyle}
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </PageContainer>
  );
};
export default DraftJS;
