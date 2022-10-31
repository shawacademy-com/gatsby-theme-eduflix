import React from 'react';
import {IconType} from 'react-icons';
import * as styles from '../../styles/components/Button.module.scss';

interface Props {
  filled?: boolean;
  rounded?: boolean;
  Icon: IconType;
  onClick?: () => void;
  label?: string;
}

const Button:React.FC<Props> = ({filled, Icon, rounded, onClick, label}) => {
  const backgroundColor = filled ? 'black' : 'white';
  const fontColor = filled ? 'white': 'black';

  const style = !rounded ? styles.button :
    filled ? styles.roundButton: styles.outlineRounded;

  return (
    <button className={style}
      style={{backgroundColor: `${backgroundColor}`, color: `${fontColor}`}}
      onClick={onClick}>
      <Icon className={styles.icon}/>
      {!rounded && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default Button;
