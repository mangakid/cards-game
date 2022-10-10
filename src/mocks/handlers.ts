import { rest } from "msw";
import { BASE_URL } from "../apis/cards-api";

export const MOCK_DECK_ID = "1234abcd";

export const handlers = [
  // Handles a GET /new/shuffle/ request
  rest.get(`${BASE_URL}/new/shuffle/`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // and new deck mock data
      ctx.status(200),
      ctx.json({
        success: true,
        deck_id: MOCK_DECK_ID,
        shuffled: true,
        remaining: 52,
      })
    );
  }),
  // Handles GET /draw request
  rest.get(`${BASE_URL}/*/draw/`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // and new deck mock data
      ctx.status(200),
      ctx.json({
        success: true,
        deck_id: MOCK_DECK_ID,
        cards: [
          {
            code: "",
            image: "first",
            images: {
              svg: "",
              png: "",
            },
            value: "10",
            suit: "HEARTS",
          },
        ],
        remaining: 52,
      })
    );
  }),
];

export const secondMockResponse = rest.get(
  `${BASE_URL}/*/draw/`,
  (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // and new deck mock data
      ctx.status(200),
      ctx.json({
        success: true,
        deck_id: MOCK_DECK_ID,
        cards: [
          {
            code: "",
            image: "second",
            images: {
              svg: "",
              png: "",
            },
            value: "10",
            suit: "CLUBS",
          },
        ],
        remaining: 51,
      })
    );
  }
);

export const thirdMockResponse = rest.get(
  `${BASE_URL}/*/draw/`,
  (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // and new deck mock data
      ctx.status(200),
      ctx.json({
        success: true,
        deck_id: MOCK_DECK_ID,
        cards: [
          {
            code: "",
            image: "third",
            images: {
              svg: "",
              png: "",
            },
            value: "9",
            suit: "HEARTS",
          },
        ],
        remaining: 51,
      })
    );
  }
);

export const fourthMockResponse = rest.get(
  `${BASE_URL}/*/draw/`,
  (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      // and new deck mock data
      ctx.status(200),
      ctx.json({
        success: true,
        deck_id: MOCK_DECK_ID,
        cards: [
          {
            code: "",
            image: "fourth",
            images: {
              svg: "",
              png: "",
            },
            value: "4",
            suit: "DIAMONDS",
          },
        ],
        remaining: 0,
      })
    );
  }
);

export const errorInitialisingDeckResponse = rest.get(
  `${BASE_URL}/new/shuffle/`,
  (req, res, ctx) => {
    return res(
      // Respond with a 500 status code
      ctx.status(500)
    );
  }
);

export const errorDealingCardResponse = rest.get(
  `${BASE_URL}/*/draw/`,
  (req, res, ctx) => {
    return res(
      // Respond with a 500 status code
      ctx.status(500)
    );
  }
);
