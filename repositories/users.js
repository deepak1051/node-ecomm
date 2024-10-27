import fs from 'fs';
import crypto from 'crypto';
import util from 'util';
import Repository from './repository.js';
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();

    const record = { ...attrs, password: `${buf.toString('hex')}.${salt}` };

    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.');
    const buf = await scrypt(supplied, salt, 64);

    return hashed === buf.toString('hex');
  }
}

const UsersRepo = new UsersRepository('users.json');
export default UsersRepo;
