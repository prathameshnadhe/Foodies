import RestaurantCard, { withTopRated } from "../RestaurantCard";
import MOCK_DATA from "../__mocks__/restaurantCardMock.json";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Should render RestaurantCard Compnent with props Data", () => {
  render(<RestaurantCard restoData={MOCK_DATA} />);

  const restoName = screen.getByText("Barista Coffee");

  expect(restoName).toBeInTheDocument();
});

it("Should render RestaurantCard Compnent with promoted Label", () => {
  const Component = withTopRated(RestaurantCard);
  render(<Component restoData={MOCK_DATA} />);

  const restoName = screen.getByText("Top Rated");

  expect(restoName).toBeInTheDocument();
});
