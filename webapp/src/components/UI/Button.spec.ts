import { render, screen } from "@testing-library/vue";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders the button with the correct styles", () => {
    const props = {
      size: "small",
      color: "primary",
      type: "outline",
    };

    render(Button, { props, slots: { default: "Test Button" } });

    const button = screen.getByText("Test Button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn--size-small");
    expect(button).toHaveClass("btn--color-primary--outline");
  });

  it("renders the button with default styles when no props are provided", () => {
    render(Button, {
      slots: {
        default: "Test Button",
      },
    });

    const button = screen.getByText("Test Button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn--size-medium");
    expect(button).toHaveClass("btn--color-primary");
  });
});
