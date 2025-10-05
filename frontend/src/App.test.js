import { render, screen } from "@testing-library/react";
import App from "./App";

// Simple test to check if the "learn react" link is rendered
test("renders learn react link", () => {
  // Render the App component
  render(<App />);

  // Find the element containing text "learn react"
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element exists in the document
  expect(linkElement).toBeInTheDocument();
});
