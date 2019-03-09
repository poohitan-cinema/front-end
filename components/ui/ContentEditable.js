import React from 'react';
import PropTypes from 'prop-types';
import ReactContentEditable from 'react-contenteditable';

import styles from '../../styles/components/ui/contenteditable.scss';

const ContentEditable = ({
  innerRef, content, placeholder, disabled, tagName, className, onChange, onBlur,
}) => {
  const classList = [styles.wrapper, className];

  if (disabled) {
    const element = React.createElement(
      tagName,
      {
        className: styles.content,
      },
      content,
    );

    return <div className={classList.join(' ')}>{element}</div>;
  }

  if (!content) {
    classList.push(styles.empty);
  }

  const placeholderElement = React.createElement(
    tagName,
    {
      className: styles.placeholder,
    },
    placeholder,
  );

  return (
    <div className={classList.join(' ')}>
      {!disabled && placeholderElement}
      <ReactContentEditable
        innerRef={innerRef}
        html={content}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        tagName={tagName}
        className={styles.content}
      />
    </div>
  );
};

ContentEditable.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.node,
  }),
  content: PropTypes.string,
  placeholder: PropTypes.string,
  tagName: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ContentEditable.defaultProps = {
  innerRef: React.createRef(),
  content: '',
  tagName: 'div',
  disabled: false,
  placeholder: 'Порожньо',
  className: '',
};

export default ContentEditable;
