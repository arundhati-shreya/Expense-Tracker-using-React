import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import SignUp from "./SignUp";

test('renders Sign Up as a text', () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );

  const signUpText = screen.getByText('Sign Up');
  expect(signUpText).toBeInTheDocument();
});

test('renders confirm password input field when in sign-up mode', () => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );
  
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    expect(confirmPasswordInput).toBeInTheDocument();
  });

test('does not render confirm password input field when in login mode', () => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );
  
    const switchButton = screen.getByText('Login with existing account');
    fireEvent.click(switchButton);

    const confirmPasswordInput = screen.queryByLabelText('Confirm Password');
    expect(confirmPasswordInput).not.toBeInTheDocument();
  });


