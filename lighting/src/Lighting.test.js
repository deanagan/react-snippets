import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lighting } from "./Lighting";

describe("Lighting component test", () => {
  test("renders off by default", () => {
    render(<Lighting initial={false}/>);
    const outputElement = screen.getByText("OFF", { exact: true });
    expect(outputElement).toBeInTheDocument();
  });

  test("renders on by default", () => {
    render(<Lighting initial={true}/>);
    const outputElement = screen.getByText("ON", { exact: true });
    expect(outputElement).toBeInTheDocument();
  });

  test("renders on if button clicked one time", () => {
    render(<Lighting initial={false}/>);
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    const outputElement = screen.getByText("ON", { exact: true });
    expect(outputElement).toBeInTheDocument();
  });

  test("renders off if button clicked twice", () => {
    render(<Lighting initial={false}/>);
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);
    userEvent.click(buttonElement);
    const outputElement = screen.getByText("OFF", { exact: true });
    expect(outputElement).toBeInTheDocument();
  });
});