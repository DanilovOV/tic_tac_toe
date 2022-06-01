import React from 'react';
import './square.scss';
import cross from '../../assets/img/cross.svg';
import circle from '../../assets/img/circle.svg';

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value === null && false}
      {props.value === 'X' && <img src={cross} alt="cross" />}
      {props.value === 'O' && <img src={circle} alt="circle" />}
    </button>
  );
};

export default Square;
