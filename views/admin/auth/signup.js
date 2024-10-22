import { getError } from '../../helpers.js';
import { layout } from '../layout.js';

export const signupTemplate = ({ req, errors }) => {
  return layout({
    content: `<div>
  Your ID is ${req.session.userId}
  <form  method="POST" action="/signup">
    <input placeholder="Email" name="email"/>
    ${getError(errors, 'email')}
    <input placeholder="Password" name="password"/>
    ${getError(errors, 'password')}
    <input placeholder="Password Confirmation" name="passwordConfirm"/>

    ${getError(errors, 'passwordConfirm')}

    <button>Sign Up</button>
  </form>
<div>`,
  });
};
