import { render, screen } from "@testing-library/react";
import { Button } from "@/shared/components/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="black">Black Button</Button>);
    const button = screen.getByText("Black Button");
    expect(button.className).toContain("bg-brand-900");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
