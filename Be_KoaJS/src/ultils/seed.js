const { faker } = require("@faker-js/faker");
const fs = require("fs");
function createRandomUser(id) {
  const product = faker.commerce.product();

  const createdAt = faker.date.past();

  const isDone = false;

  return {
    id,
    name: product,
    createdAt,
    isDone,
  };
}
function createRandomUsers(count) {
  return Array.from({ length: count }, (_, i) => createRandomUser(i + 1));
}
const createUser = createRandomUsers(6);

fs.writeFileSync(
  "src/database/products.json",
  JSON.stringify({
    data: createUser,
  })
);
