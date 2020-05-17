# Module Project: Advanced Form Management - User Onboarding
## Project Description

We've seen many different styles of form management by now -- simple to complex. Today we are going to unleash your inner form-wizard! 🧙

## Set Up The Project

- [ ] Start off by installing a blank React app by running `npx create-react-app <app-name> --use-npm`.
- [ ] Using `npm`, add the following as dependencies inside your React app:
  - `yup`
  - `axios`
- [ ] Create a component file called `Form.js`, import it into your `App.js` file, and place the component in your JSX there.

## STEP 1 - Create Your Advanced Form

We want to create a form to onboard a new user to our system. We need _at least_ the following pieces of information about our new user:

- [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server.

## STEP 2 - Implement Form Validation and Error Messaging

Form validation is one of the facets of an application that makes it feel polished and controlled from a user perspective. With that in mind, implement the following:

- [ ] Using Yup, set up _at least_ two different validations along with custom error messages that will display on screen when validation fails.

## STEP 3 - Make a POST Request

Being able to `POST` data is a key skill of any developer, no matter your skill level.

- [ ] Craft a `POST` request using `axios` that sends your form data to the following endpoint: _https://reqres.in/api/users_
- [ ] Verify using a `console.log()` that you are receiving a successful response back

(Note: For those that are curious, we're using [reqres.in](import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: yup.string().required("Must include a password"),

  terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

export default function Form() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  // BONUS!: state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Everytime formState changes, check to see if it passes verification.
  // If it does, then enable the submit button, otherwise disable
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  const validate = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  // onChange function
  const inputChange = e => {
    e.persist();
    // console.log("input changed!", e.target.value, e.target.checked);
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errorState.password.length > 0 ? (
          <p className="error">{errorState.password}</p>
        ) : null}
      </label>
      <label htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
        {errorState.terms.length > 0 ? (
          <p className="error">{errorState.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}) for this assignment's API. It's a free API that allows us to simulate a `POST` request for any data that we send it. Pretty awesome!)

## STEP 4 - Display Returned Data to Screen

When you get your data back, you will want to do something with it, right? Let's display a list of users in our app.

- [ ] Set up a state property called `users` that is initialized with an empty array
- [ ] Every time you make a `POST` request, and get that new user data back, update your `users` state with the new user added to the array
- [ ] Render `users` in your app. You can use the html pre tag and JSON.stringify() method to display your post request.

## Stretch Goals

The following are stretch goals that you should attempt _after_ you meet MVP for your project:

- [ ] Add basic styling to your form in your app. Make it look pretty with any styling method you choose.
- [ ] Implement a dropdown menu in your form. Add a `role` value to your state and add a dropdown with different roles for your users.
- [ ] Create 3 new inputs inside your form of your choice along with corresponding validation and error messaging
- [ ] Add to your existing handling so that, if a user inputs their email as `waffle@syrup.com`, they receive an error message in their form that says _"That email is already taken."_
