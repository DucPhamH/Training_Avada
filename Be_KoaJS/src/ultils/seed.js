const { faker } = require("@faker-js/faker");
const fs = require("fs");
function createRandomUser(id) {
  const product = faker.commerce.product();
  const price = faker.commerce.price();
  const description = faker.lorem.sentence();
  const color = faker.lorem.sentence();
  const createdAt = faker.date.past();
  const image = faker.image.avatar();

  return {
    id,
    name: product,
    price,
    description,
    product,
    color,
    createdAt,
    image,
  };
}
function createRandomUsers(count) {
  return Array.from({ length: count }, (_, i) => createRandomUser(i + 1));
}
const createUser = createRandomUsers(1000);

fs.writeFileSync(
  "src/database/products.json",
  JSON.stringify({
    data: createUser,
  })
);
