import { render, screen } from "@testing-library/react";
import ContactUs from "../ContactUs";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Case", () => {
  it("Should load Contact Us component", () => {
    render(<ContactUs />);

    const heading = screen.getByText("Contact Us Page");

    // Assertion
    expect(heading).toBeInTheDocument();
  });

  test("Should load 2 heading tags", () => {
    render(<ContactUs />);

    // Querying
    const headings = screen.getAllByRole("heading");

    // Assertion
    expect(headings.length).toBe(2);
  });
});
