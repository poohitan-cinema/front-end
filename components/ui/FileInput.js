import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/ui/file-input.scss';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filename: '' };
    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const input = this.inputRef.current;
    const file = input.files[0];
    const { onChange } = this.props;

    this.setState({ filename: file.name });

    onChange(file);
  }

  render() {
    const {
      label,
      id,
      disabled,
      className,
    } = this.props;
    const { filename } = this.state;

    const wrapperClassList = [styles.wrapper, className];

    if (disabled) {
      wrapperClassList.push(styles.disabled);
    }

    return (
      <div className={wrapperClassList.join(' ')}>
        <label htmlFor={id} className={styles.content}>
          <span className={styles.icon}><i className="fas fa-file-upload" /></span>
          <span className={styles.label}>{label}</span>
          <input
            id={id}
            type="file"
            className={styles.nativeInput}
            ref={this.inputRef}
            disabled={disabled}
            onChange={this.handleChange}
          />
        </label>
        <span className={styles.filename}>{filename}</span>
      </div>
    );
  }
}

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FileInput.defaultProps = {
  label: 'Вибрати файл',
  disabled: false,
  className: '',
};

export default FileInput;
