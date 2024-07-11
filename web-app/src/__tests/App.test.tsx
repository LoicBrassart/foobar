import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../App";

test("displays something", async () => {
  render(<App />);
  expect(
    await screen.findByText("Here's the content", {
      exact: false,
    })
  ).toBeInTheDocument();
});
