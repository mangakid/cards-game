import React from "react";
import { MessageWrapper, Header } from "./CardGame.Header.styles";

type Props = {
  doesValueMatch: boolean;
  doesSuitMatch: boolean;
};

export const CardGameHeader = ({ doesValueMatch, doesSuitMatch }: Props) => {
  const shouldShowText = doesSuitMatch || doesValueMatch;
  return (
    <Header>
      <MessageWrapper>
        {shouldShowText ? (
          <div>SNAP {doesSuitMatch ? "SUIT" : "VALUE"}!</div>
        ) : null}
      </MessageWrapper>
    </Header>
  );
};
