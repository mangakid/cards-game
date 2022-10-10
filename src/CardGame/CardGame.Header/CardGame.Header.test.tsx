import { render, screen } from "@testing-library/react";
import { CardGameHeader } from "./CardGame.Header";

describe("CardGameHeader", () => {
  test("Displays a message if suit or value matches", () => {
    const { rerender } = render(
      <CardGameHeader doesValueMatch doesSuitMatch={false} />
    );
    expect(screen.getByText(/SNAP VALUE!/)).toBeInTheDocument();
    expect(screen.queryByText(/SNAP SUIT!/)).not.toBeInTheDocument();
    rerender(<CardGameHeader doesValueMatch={false} doesSuitMatch />);
    expect(screen.queryByText(/SNAP VALUE!/)).not.toBeInTheDocument();
    expect(screen.getByText(/SNAP SUIT!/)).toBeInTheDocument();
  });
});
