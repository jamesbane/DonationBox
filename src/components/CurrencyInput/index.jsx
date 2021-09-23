import React from "react";
import cn from "classnames";

import NumericalInput from "../NumbericalInput";
import { Text } from "rebass";
import style from "./CurrencyInput.module.scss";
import BigNumber from "bignumber.js";

export default function CurrencyInputPanel({
                                             value,
                                             onUserInput,
                                             onMax,
                                             showMaxButton,
                                             balance,
                                             id,
                                             logo,
                                             tokenName
                                           }) {
  return (
    <div className={style.inputPanel} id={id}>
      <div className={style.container}>
        <div className={style.inputRow}>
          <div className={style.currencySelect}>
                        <span className={style.aligner}>
                            <div className={style.rowFixed}>
                                <img src={logo} width={32} height={32} alt={"eth"}/>
                                <span className={style.tokenName}>{tokenName}</span>
                            </div>
                        </span>
          </div>
          <NumericalInput
            value={value}
            onUserInput={(val) => {
              onUserInput(val);
            }}
          />
        </div>
        <div className={cn(style.labelRow, style.fiatRow)}>
          <div className={style.rowBetween}>
            <div className={style.rowFixed} style={{ height: "17px" }}>
              <Text
                onClick={onMax}
                color={"#C3C5CB"}
                fontWeight={400}
                fontSize={14}
                style={{ display: "inline", cursor: "pointer" }}
              >
                {balance ? (
                  <span>Balance: {(new BigNumber(balance)).toFixed(4)}</span>
                ) : null}
              </Text>
              {showMaxButton && balance ? (
                <button className={style.maxBtn} onClick={onMax}>
                  (Max)
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
