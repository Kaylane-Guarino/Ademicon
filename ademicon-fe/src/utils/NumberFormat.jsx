import { TextField, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';

function FormatNumber({ handleData, edit, editValue }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    handleData(value);
  }, [value])

  const handleValueChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    setValue(numericValue);
  };

  const formatCurrency = (value) => {
    const formattedValue = parseFloat(value) / 100;

    return isNaN(formattedValue)
      ? '0,00'
      : formattedValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).replace('R$', ''); // Remover 'R$' da formatação
  };

  const displayValue = formatCurrency(value);

  return (
    <TextField
      label="Valor do consórcio"
      value={edit === true ? formatCurrency(editValue) : displayValue}
      onChange={handleValueChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputProps: {
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }
      }}
      className='w-full'
      size='small'
    />
  );
}

export default FormatNumber;
