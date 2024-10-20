import { layout } from '../layout.js';

export const signinTemplate = () => {
  return layout({
    content: `
  <div>
  <form  method="POST" action="/signin">
    <input placeholder="Email" name="email" />
    <input placeholder="Password" name="password" />
    <button>Sign In</button>
  </form>
<div>`,
  });
};
