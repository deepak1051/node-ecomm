import { getError } from '../../helpers.js';
import { layout } from '../layout.js';

export const signinTemplate = ({ errors }) => {
  return layout({
    content: `
  <div>
  <form  method="POST" action="/signin">
    <input placeholder="Email" name="email" />
    ${getError(errors, 'email')}
    <input placeholder="Password" name="password" />
    ${getError(errors, 'password')}
    <button>Sign In</button>
  </form>
<div>`,
  });
};
