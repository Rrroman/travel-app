import React from 'react';
import styles from './auth-button.module.css';

type Props = {
  value: string;
  buttonClick?: () => void;
};

const AuthButton: React.FC<Props> = ({ value, buttonClick }) => {
  return (
    <input
      className={styles['auth-button']}
      type="submit"
      value={value}
      onClick={buttonClick}
    />
  );
};

export { AuthButton };
