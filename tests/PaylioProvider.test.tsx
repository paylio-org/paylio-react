import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { PaylioProvider, usePaylioContext } from "../src/index";

function TestConsumer() {
  const ctx = usePaylioContext();
  return <span data-testid="pk">{ctx.publishableKey}</span>;
}

describe("PaylioProvider", () => {
  it("provides publishableKey to children via context", () => {
    render(
      <PaylioProvider publishableKey="pk_test_123">
        <TestConsumer />
      </PaylioProvider>
    );
    expect(screen.getByTestId("pk").textContent).toBe("pk_test_123");
  });

  it("throws if usePaylioContext is called outside PaylioProvider", () => {
    // Suppress React error boundary noise
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(/PaylioProvider/);
    spy.mockRestore();
  });

  it("renders children correctly", () => {
    render(
      <PaylioProvider publishableKey="pk_test">
        <div data-testid="child">Hello</div>
      </PaylioProvider>
    );
    expect(screen.getByTestId("child").textContent).toBe("Hello");
  });
});
