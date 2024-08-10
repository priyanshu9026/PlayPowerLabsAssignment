import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeZoneConverter from "./TimeZoneConverter";

describe("TimeZoneConverter", () => {
  test("renders the initial time zones", () => {
    render(<TimeZoneConverter />);
    expect(screen.getByText("UTC")).toBeInTheDocument();
    expect(screen.getByText("Asia/Kolkata")).toBeInTheDocument();
  });

  test("adds a new time zone", () => {
    render(<TimeZoneConverter />);
    const input = screen.getByPlaceholderText("Enter Time Zone");
    const addButton = screen.getByText("Add Time Zone");

    fireEvent.change(input, { target: { value: "America/New_York" } });
    fireEvent.click(addButton);

    expect(screen.getByText("America/New_York")).toBeInTheDocument();
  });

  test("deletes a time zone", () => {
    render(<TimeZoneConverter />);
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);

    expect(screen.queryByText("UTC")).not.toBeInTheDocument();
  });

  test("reverses the order of time zones", () => {
    render(<TimeZoneConverter />);
    const reverseButton = screen.getByText("Reverse Order");

    fireEvent.click(reverseButton);

    const timeZones = screen.getAllByTestId("timezone-display");
    expect(timeZones[0].textContent).toContain("Asia/Kolkata");
    expect(timeZones[1].textContent).toContain("UTC");
  });

  test("toggles dark mode", () => {
    render(<TimeZoneConverter />);
    const toggleButton = screen.getByText("Dark Mode");

    fireEvent.click(toggleButton);
    expect(document.body.classList.contains("dark-mode")).toBe(true);

    fireEvent.click(toggleButton);
    expect(document.body.classList.contains("dark-mode")).toBe(false);
  });

  test("generates a shareable link", () => {
    render(<TimeZoneConverter />);
    const shareButton = screen.getByText("Generate Shareable Link");

    fireEvent.click(shareButton);

    expect(window.alert).toHaveBeenCalled();
  });
});
