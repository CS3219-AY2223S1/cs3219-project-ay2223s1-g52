import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SelectionContent from "views/selection-page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const SelectionContentRoute = (
  <Router>
    <Routes>
      <Route path="/" element={<SelectionContent />} />
    </Routes>
  </Router>
);

it("renders correctly", async () => {
  const tree = renderer.create(SelectionContentRoute).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders text in cards correctly", async () => {
  render(SelectionContentRoute);
  expect(screen.getByText("Easy")).toBeInTheDocument();
  expect(screen.getByText("Medium")).toBeInTheDocument();
  expect(screen.getByText("Hard")).toBeInTheDocument();
});

test("renders easy dialog correctly", async () => {
  render(SelectionContentRoute);
  const difficulty = "Easy";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});

test("renders medium dialog correctly", async () => {
  render(SelectionContentRoute);
  const difficulty = "Medium";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});

test("renders hard dialog correctly", async () => {
  render(SelectionContentRoute);
  const difficulty = "Hard";
  await userEvent.click(screen.getByText(difficulty));

  expect(
    screen.getByText(`Find a match for Difficulty: ${difficulty}`),
  ).toBeInTheDocument();
  expect(screen.getByText("Match")).toBeInTheDocument();
});
