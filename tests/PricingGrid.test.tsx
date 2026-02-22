import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { PaylioProvider, PricingGrid } from "../src/index";

// Mock @paylio/embed-js to avoid real DOM iframe injection
vi.mock("@paylio/embed-js", () => ({
  createPaylioEmbed: vi.fn(() => ({ destroy: vi.fn() })),
  VERSION: "0.1.0",
}));

import { createPaylioEmbed } from "@paylio/embed-js";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PricingGrid", () => {
  it("renders a container div", () => {
    render(
      <PaylioProvider publishableKey="pk_test">
        <PricingGrid userId="u1" />
      </PaylioProvider>
    );
    // Should render a div that the embed mounts into
    const container = document.querySelector("[data-paylio-grid]");
    expect(container).toBeTruthy();
  });

  it("calls createPaylioEmbed on mount", () => {
    render(
      <PaylioProvider publishableKey="pk_live_abc">
        <PricingGrid userId="user_42" />
      </PaylioProvider>
    );
    expect(createPaylioEmbed).toHaveBeenCalledWith(
      expect.objectContaining({
        publishableKey: "pk_live_abc",
        userId: "user_42",
      })
    );
  });

  it("passes country to createPaylioEmbed when provided", () => {
    render(
      <PaylioProvider publishableKey="pk_test">
        <PricingGrid userId="u1" country="IN" />
      </PaylioProvider>
    );
    expect(createPaylioEmbed).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "IN",
      })
    );
  });

  it("calls destroy on unmount", () => {
    const mockDestroy = vi.fn();
    vi.mocked(createPaylioEmbed).mockReturnValue({ destroy: mockDestroy });

    const { unmount } = render(
      <PaylioProvider publishableKey="pk_test">
        <PricingGrid userId="u1" />
      </PaylioProvider>
    );

    unmount();
    expect(mockDestroy).toHaveBeenCalled();
  });

  it("throws if used outside PaylioProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<PricingGrid userId="u1" />)).toThrow(
      /PaylioProvider/
    );
    spy.mockRestore();
  });

  it("re-creates embed when userId changes", () => {
    const mockDestroy = vi.fn();
    vi.mocked(createPaylioEmbed).mockReturnValue({ destroy: mockDestroy });

    const { rerender } = render(
      <PaylioProvider publishableKey="pk_test">
        <PricingGrid userId="u1" />
      </PaylioProvider>
    );

    rerender(
      <PaylioProvider publishableKey="pk_test">
        <PricingGrid userId="u2" />
      </PaylioProvider>
    );

    // Should have destroyed old and created new
    expect(mockDestroy).toHaveBeenCalled();
    expect(createPaylioEmbed).toHaveBeenCalledTimes(2);
  });
});
