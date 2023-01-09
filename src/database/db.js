'use strict';

require('dotenv').config()
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      username: 'Alice2',
      email: 'alice2@prisma.io',
      password: 'sdfssfd'
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
