import React from "react";
import { IToken } from "../../models/models";
import { useActions } from "../../hooks/useActions";
// import defaultImg from "../../assets/defaultImg.svg";

export const Token = ({ virtualItem, token, onClose }: any) => {
  const { setCrypto } = useActions();
  const { symbol, balance, logoUrl, name, tokenAmount } = token;

  const selectHandler = (token: IToken[]) => {
    setCrypto(token);
    onClose();
  };

  return (
    <button
      key={virtualItem.key}
      type={"button"}
      onClick={() => selectHandler([token])}
      className={
        "flex items-center justify-between gap-2 px-3 cursor-pointer hover:bg-lightGray transition-colors duration-300 rounded-[15px]"
      }
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
    >
      <div className={"flex items-center gap-3"}>
        <img width={48} height={48} src={logoUrl} alt={""} />
        <div className={"flex flex-col items-start"}>
          <span className={"font-bold"}>{name}</span>
          <span className={"text-gray"}>
            {tokenAmount !== 0 && tokenAmount} {symbol}
          </span>
        </div>
      </div>

      <div className={"font-bold"}>
        {balance !== 0 ? `$${balance}` : balance}
      </div>
    </button>
  );
};
