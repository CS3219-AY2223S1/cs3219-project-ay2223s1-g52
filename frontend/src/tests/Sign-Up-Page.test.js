import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import SignUpPage from "views/sign-up-page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

it("renders sign in correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
        </Routes>
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders create account header correctly", () => {
  render(
    <Router location={"/"}>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>,
  );

  expect(
    screen.getByRole("heading", {
      name: /create account/i,
    }),
  ).toHaveTextContent("Create Account");
});

test("renders username textbox correctly", () => {
  render(
    <Router location={"/"}>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>,
  );

  expect(
    screen.getByRole("textbox", {
      name: /username/i,
    }),
  ).toBeInTheDocument();
});

test("renders create account button correctly", () => {
  render(
    <Router location={"/"}>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>,
  );

  expect(
    screen.getByRole("button", {
      name: /Create Account/i,
    }),
  ).toBeInTheDocument();
});

test("renders back button correctly", () => {
  render(
    <Router location={"/"}>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>,
  );

  expect(
    screen.getByRole("button", {
      name: "",
    }),
  ).toBeInTheDocument();
});
