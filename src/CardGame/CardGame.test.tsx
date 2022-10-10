import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import {
  secondMockResponse,
  thirdMockResponse,
  fourthMockResponse,
  errorInitialisingDeckResponse,
  errorDealingCardResponse,
} from "../mocks/handlers";
import user from "@testing-library/user-event";
import CardGame from "./CardGame";

describe("CardGame", () => {
  test("only placeholders are shown initially", async () => {
    render(<CardGame />);
    const cardImage = screen.queryByRole("img");
    expect(cardImage).not.toBeInTheDocument();
  });

  test("doesnt explode if initial deck not fetched correctly", async () => {
    server.use(errorInitialisingDeckResponse);
    await render(<CardGame />);
    const cardImage = screen.queryByRole("img");
    expect(cardImage).not.toBeInTheDocument();
    const dealButton = await screen.findByRole("button");
    expect(dealButton).toBeInTheDocument();
  });

  test("doesnt explode if deal card fails", async () => {
    server.use(errorDealingCardResponse);
    render(<CardGame />);
    const cardImage = screen.queryByRole("img");
    expect(cardImage).not.toBeInTheDocument();
    const dealButton = await screen.findByRole("button");
    expect(dealButton).toBeInTheDocument();
  });

  test("clicking on button deals a card to right side", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => {
      expect(screen.queryByAltText(/current-card/)).not.toBeInTheDocument();
    });
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    await user.click(dealButton);

    const currentCardImage = await screen.findByAltText(/current-card/);
    expect(currentCardImage).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByAltText(/previous-card/)).not.toBeInTheDocument();
    });
  });

  test("clicking on button again deals a new card to right side and previous card is shown on left", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });
    await user.click(dealButton);
    server.use(secondMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });
    expect(await screen.findByAltText(/current-card/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByAltText(/previous-card/)).not.toBeInTheDocument();
    });
    user.click(dealButton);
    const currentCardImage = await screen.findByAltText(/current-card/);
    const previousCardImage = await screen.findByAltText(/previous-card/);
    expect(currentCardImage).toBeInTheDocument();
    expect(currentCardImage).toHaveAttribute("src", "second");
    expect(previousCardImage).toBeInTheDocument();
    expect(previousCardImage).toHaveAttribute("src", "first");
  });

  test("if values match the correct message is shown", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    await user.click(dealButton);

    server.use(secondMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 5000,
    });
    await waitFor(() => {
      expect(screen.queryByText("SNAP VALUE!")).not.toBeInTheDocument();
    });

    user.click(dealButton);
    expect(await screen.findByText("SNAP VALUE!")).toBeInTheDocument();
  });

  test("if suits match the correct message is shown", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    await user.click(dealButton);

    server.use(thirdMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 5000,
    });
    await waitFor(() => {
      expect(screen.queryByText("SNAP SUIT!")).not.toBeInTheDocument();
    });

    user.click(dealButton);
    expect(await screen.findByText("SNAP SUIT!")).toBeInTheDocument();
  });

  test("if no matches no message is shown", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    await user.click(dealButton);
    server.use(fourthMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 5000,
    });
    await waitFor(() => {
      expect(screen.queryByText("SNAP SUIT!")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("SNAP VALUE!")).not.toBeInTheDocument();
    });

    user.click(dealButton);
    await waitFor(() => {
      expect(screen.queryByText("SNAP SUIT!")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("SNAP VALUE!")).not.toBeInTheDocument();
    });
  });

  test("Once all 52 cards have been drawn, remove the button and instead display the total number of value matches and the total number of suit matches", async () => {
    render(<CardGame />);
    const dealButton = await screen.findByRole("button");
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    await user.click(dealButton);

    server.use(secondMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    user.click(dealButton);

    server.use(thirdMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });

    server.use(fourthMockResponse);
    await waitFor(() => expect(dealButton).not.toBeDisabled(), {
      timeout: 1000,
    });
    user.click(dealButton);

    await waitFor(() => expect(dealButton).not.toBeInTheDocument(), {
      timeout: 1000,
    });
    expect(await screen.findByText("VALUE MATCHES: 0")).toBeInTheDocument();
    expect(await screen.findByText("SUIT MATCHES: 1")).toBeInTheDocument();
  });
});
