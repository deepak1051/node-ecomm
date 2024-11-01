import layout from '../layout.js';
import { getError } from '../../helpers.js';

const newProductTemplate = () => {
  return layout({
    content: `
    
      <form method="POST" enctype="multipart/form-data" >
        <input placeholder="Title" name="title"/>
        <input placeholder="Price" name="price"/>
        <input type="file" name="image"/>

        <button>Submit</button>
      </form>
    `,
  });
};

export default newProductTemplate;
