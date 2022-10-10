import React from "react";
import {
  ButtonWrapper,
  DealButton,
  Footer,
  Tally,
} from "./CardGame.Footer.styles";

type Props = {
  onButtonClick: () => void;
  isButtonDisabled: boolean;
  valueCount: number;
  suitCount: number;
  shouldShowTally: boolean;
};

export const CardGameFooter = ({
  onButtonClick,
  isButtonDisabled,
  valueCount,
  suitCount,
  shouldShowTally,
}: Props) => {
  return (
    <Footer>
      {!shouldShowTally ? (
        <ButtonWrapper>
          <DealButton disabled={isButtonDisabled} onClick={onButtonClick}>
            Draw card
          </DealButton>
        </ButtonWrapper>
      ) : null}
      {shouldShowTally ? (
        <Tally>
          <div>VALUE MATCHES: {valueCount}</div>
          <div>SUIT MATCHES: {suitCount}</div>
        </Tally>
      ) : null}
    </Footer>
  );
};
