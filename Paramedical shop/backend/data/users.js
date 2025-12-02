import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Sriram',
    email: 'sriram.inventor@gmail.com',
    password: bcrypt.hashSync('sriram123', 10),
    isAdmin: true
  },
  {
    name: 'Yasar',
    email: 'yasar@email.com',
    password: bcrypt.hashSync('yasar123', 10),
    isAdmin: false
  }
  
];

export default users;
