import React from 'react'
import style from './NumbericalInput.module.scss';
import {escapeRegExp} from "../../utils";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NumericalInput = React.memo(function InnerInput({
                                                               value,
                                                               onUserInput,
                                                               placeholder,
                                                               prependSymbol,
                                                               ...rest
                                                             }) {
  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  };

  return (
    <input className={style.styledInput}
           {...rest}
           value={prependSymbol && value ? prependSymbol + value : value}
           onChange={(event) => {
             if (prependSymbol) {
               const value = event.target.value;

               // cut off prepended symbol
               const formattedValue = value.toString().includes(prependSymbol)
                 ? value.toString().slice(1, value.toString().length + 1)
                 : value;

               // replace commas with periods, because uniswap exclusively uses period as the decimal separator
               enforcer(formattedValue.replace(/,/g, '.'))
             } else {
               enforcer(event.target.value.replace(/,/g, '.'))
             }
           }}
      // universal input options
           inputMode="decimal"
           autoComplete="off"
           autoCorrect="off"
      // text-specific options
           type="text"
           pattern="^[0-9]*[.,]?[0-9]*$"
           placeholder={placeholder || '0.0'}
           minLength={1}
           maxLength={79}
           spellCheck="false"
    />
  )
});

export default NumericalInput