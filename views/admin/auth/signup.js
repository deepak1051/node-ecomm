import { layout } from '../layout.js';

export const signupTemplate = ({ req }) => {
  return layout({
    content: `<div>
  Your ID is ${req.session.userId}
  <form  method="POST" action="/signup">
    <input placeholder="Email" name="email"/>
    <input placeholder="Password" name="password"/>
    <input placeholder="Password Confirmation" name="passwordConfirm"/>

    <button>Sign Up</button>
  </form>
<div>`,
  });
};
