import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { CardGameFooter } from "./CardGame.Footer";

const defaultProps = {
  onButtonClick: jest.fn,
  isButtonDisabled: false,
  valueCount: 3,
  suitCount: 5,
  shouldShowTally: false,
};

describe("CardGameFooter", () => {
  test("should show the button when not showing tally", async () => {
    const { rerender } = render(<CardGameFooter {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    rerender(<CardGameFooter {...defaultProps} shouldShowTally />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getAllByText(/MATCHES/)).toHaveLength(2);
  });

  test("disables button when passed isButtonDisabled", async () => {
    const { rerender } = render(<CardGameFooter {...defaultProps} />);
    expect(screen.getByRole("button")).toBeEnabled();
    rerender(<CardGameFooter {...defaultProps} isButtonDisabled />);
    expect(screen.getByRole("button")).not.toBeEnabled();
  });

  test("clicking on the button calls onButtonClick when button enabled", async () => {
    const mockClickHandler = jest.fn();
    const { rerender } = render(
      <CardGameFooter {...defaultProps} onButtonClick={mockClickHandler} />
    );

    user.click(screen.getByRole("button"));
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    rerender(<CardGameFooter {...defaultProps} isButtonDisabled />);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  test("shows the tally with suit and value match counts", async () => {
    render(<CardGameFooter {...defaultProps} shouldShowTally />);
    expect(screen.getByText(/VALUE MATCHES: 3/)).toBeInTheDocument();
    expect(screen.getByText(/SUIT MATCHES: 5/)).toBeInTheDocument();
  });
});
