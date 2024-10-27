import Repository from './repository.js';

class ProductsRepository extends Repository {}

const productsRepo = new ProductsRepository('products.json');
export default productsRepo;
