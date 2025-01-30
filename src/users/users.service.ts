import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  username: string;
  password: string;
}


const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 22,
    email: 'john@example.com',
    username: 'john_doe',
    password: 'password'
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 25,
    email: 'jande@example.com',
    username: 'jane_doe',
    password: 'password'
  }
]



@Injectable()
export class UsersService {

  async findUserByUsername(username: string): Promise<User | undefined> {
    return users.find(user => user.username === username);
  }


  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find(user => user.email === email);
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}