import React, { Ref, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { cx, css } from '@emotion/css';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  CodeOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  ColumnWidthOutlined,
} from '@ant-design/icons';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `,
      )}
    />
  ),
);

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any;
      } & BaseProps
    >,
    ref: Ref<OrNull<null>>,
  ) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join('\n');
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `,
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    );
  },
);

const H1Icon = () => {
  return (
    <span
      className={cx(
        'material-icons',
        css`
          font-size: 18px;
          vertical-align: center;
        `,
      )}
    >
      H1
    </span>
  );
};
const H2Icon = () => {
  return (
    <span
      className={cx(
        'material-icons',
        css`
          font-size: 18px;
          vertical-align: center;
        `,
      )}
    >
      H2
    </span>
  );
};
const QuoteIcon = () => {
  return (
    <span
      className={cx(
        'material-icons',
        css`
          font-size: 18px;
          vertical-align: text-bottom;
          font-weight: 700;
        `,
      )}
      title="引用"
    >
      ,,
    </span>
  );
};

const iconList = {
  format_bold: <BoldOutlined title="加粗" />,
  format_italic: <ItalicOutlined title="斜体" />,
  format_underlined: <UnderlineOutlined title="下划线" />,
  code: <CodeOutlined title="代码块" />,
  looks_one: <H1Icon />,
  looks_two: <H2Icon />,
  format_quote: <QuoteIcon />,
  format_list_numbered: <OrderedListOutlined title="有序列表" />,
  format_list_bulleted: <UnorderedListOutlined title="无序列表" />,
  format_align_left: <AlignLeftOutlined title="左对齐" />,
  format_align_center: <AlignCenterOutlined title="居中对齐" />,
  format_align_right: <AlignRightOutlined title="右对齐" />,
  format_align_justify: <ColumnWidthOutlined title="自适应填充" />,
};

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => {
    // console.log(props);
    return (
      <span
        {...props}
        ref={ref}
        className={cx(
          'material-icons',
          className,
          css`
            font-size: 18px;
            vertical-align: text-bottom;
          `,
        )}
      >
        {iconList[props.children]}
      </span>
    );
  },
);

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `,
      )}
    />
  ),
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `,
      )}
    />
  ),
);
