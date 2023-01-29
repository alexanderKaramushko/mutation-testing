import React, { FC } from 'react';
import isEven from './utils/numbers/isEven';

type Props = {
  amount: number;
}

export default ((props) => {
  const { amount } = props;

  return (
    <div>{isEven(amount) ? 'amount is even' : 'amount is odd'}</div>
  )
}) as FC<Props>;
