import { render, screen } from "@testing-library/react";

import App from "./App";
import TabNavigator from "./Components/navigator";
import useFetch from "./hooks/useFetch";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("should display all data", () => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  render(<App />);
});
