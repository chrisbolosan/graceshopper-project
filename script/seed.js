'use strict';

const {
  db,
  models: { User, Product, Category, Order },
} = require('../server/db');
const OrderDetails = require('../server/db/models/OrderDetails');

const users = [
  {
    first_name: 'Jeff',
    last_name: 'Raymond',
    password: 123,
    address: '201 Huntington Way, Boise, ID, 60597',
    isAdmin: true,
    email: 'jbro@gmail.com',
    username: 'jbro',
  },
  {
    first_name: 'James',
    last_name: 'Bond',
    password: 123,
    address: '201 Huntington Way, Boise, ID, 60597',
    isAdmin: true,
    email: 'james@gmail.com',
    username: 'jbond',
  },
  {
    first_name: 'Mike',
    last_name: 'Ishikawa',
    password: 123,
    address: '205 Bear Way, Boise, ID, 60597',
    isAdmin: false,
    email: 'mikeishi@gmail.com',
    username: 'mishikawa',
  },
  {
    first_name: 'Jessica',
    last_name: 'Lynn',
    password: 123,
    address: '345 Oracle Lane, Atlanta, GA, 60597',
    isAdmin: false,
    email: 'jess@gmail.com',
    username: 'jlynn',
  },
  {
    first_name: 'Andrew',
    last_name: 'Luck',
    password: 123,
    address: '576 Freedom Drive, Boise, ID, 60597',
    isAdmin: false,
    email: 'aluck@gmail.com',
    username: 'aluck',
  },
  {
    first_name: 'Michael',
    last_name: 'Jordan',
    password: 123,
    address: '569 Stone Drive, Coopertown, NY, 56732',
    isAdmin: true,
    email: 'mj@gmail.com',
    username: 'mjordan',
  },
  {
    first_name: 'Josie',
    last_name: 'Wang',
    password: 123,
    address: '713 Fuji Lane, Pensacola, FL, 98065',
    isAdmin: false,
    email: 'josie@gmail.com',
    username: 'jwang',
  },
  {
    first_name: 'Alex',
    last_name: 'Trebek',
    password: 123,
    address: '900 Fuji Lane, Treasure Island, FL, 98065',
    isAdmin: false,
    email: 'alex@gmail.com',
    username: 'atrebek',
  },
  {
    first_name: 'Tina',
    last_name: 'Young',
    password: 123,
    address: '569 Stone Drive, Coopertown, NY, 56732',
    isAdmin: true,
    email: 'm@gmail.com',
    username: 'tyoung',
  },
  {
    first_name: 'Sally',
    last_name: 'Jones',
    password: 123,
    address: '900 Fuji Lane, Treasure Island, FL, 98065',
    isAdmin: false,
    email: 'sally@gmail.com',
    username: 'sjones',
  },
];

const indianFood = [
  {
    name: 'Briyani',
    description:
      'Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent. It is made with Indian spices, rice, and meat usually that of chicken, goat, lamb, prawn, fish, and sometimes, in addition, eggs or vegetables such as potatoes in certain regional varieties.',
    price: 8,
    quantity: 19,
    imgUrl: '/images/biryani.jpeg',
  },

  {
    name: 'Samosa',
    description:
      'A samosa is a South Asian fried or baked pastry with a savory filling like spiced potatoes, onions, peas, chicken and other meats, or lentils. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.',
    price: 5,
    quantity: 25,
    imgUrl: '/images/samosa.jpeg',
  },
  {
    name: 'Tikki Masala',
    description:
      'Chicken tikka masala is a dish consisting of roasted marinated chicken chunks in spiced curry sauce. The curry is usually creamy and orange-coloured. The dish was popularized by cooks from South Asia living in Great Britain.',
    price: 18,
    quantity: 9,
    imgUrl: '/images/tikki.jpeg',
  },
];

const barbequeFood = [
  {
    name: 'BBQ Ribs',
    description:
      'Tender, fall off the bone ribs, smoked to perfection. MURICA!',
    price: 19,
    quantity: 24,
    imgUrl: '/images/ribs.jpeg',
  },
  {
    name: 'Smoked Brisket',
    description: 'Smoked for hours, covered in sea salt and spices',
    price: 14,
    quantity: 12,
    imgUrl: '/images/brisket.jpeg',
  },
  {
    name: 'Pulled Pork Sandwich',
    description: 'Sauced pulled pork between a brioche bun',
    price: 17,
    quantity: 20,
    imgUrl: '/images/pulled-pork.jpeg',
  },
];
const japaneseFood = [
  {
    name: 'Otoro',
    description:
      'Otoro is the belly cut of the highly prized Bluefin Tuna featuring intense fat marbling resulting in a rich, melt-in-your-mouth buttery flavor and tenderness not found with any other fish.',
    price: 100,
    quantity: 8,
    imgUrl: '/images/otoro.jpeg',
  },

  {
    name: 'Unagi',
    description: 'Grilled Eel.',
    price: 14,
    quantity: 26,
    imgUrl: '/images/unagi.jpeg',
  },

  {
    name: 'Ramen',
    description: 'Ramen. Just, ramen.',
    price: 20,
    quantity: 56,
    imgUrl: '/images/ramen.jpeg',
  },
  {
    name: 'A5 Wagyu',
    description:
      'Wagyu beef—you know, the transcendently tender, fatty, umami-rich steak—has become as synonymous with luxury as caviar or black truffles. But no matter how many Michelin-starred menus this delicacy graces, all of the facts about Wagyu steak still tend to elude even the most seasoned diners.',
    price: 200,
    quantity: 13,
    imgUrl: '/images/a5.jpeg',
  },
];
const thaiFood = [
  {
    name: 'Orange Chicken',
    description:
      'Boneless fried chicken, cut into bite sized pieces and fried with a special sauce.',
    price: 10,
    quantity: 13,
    imgUrl: '/images/oj.jpeg',
  },
  {
    name: 'Beef Fried Rice',
    description: 'Savory flank steak, fried rice with vegetables.',
    price: 16,
    quantity: 5,
    imgUrl: '/images/beef-rice.jpeg',
  },
  {
    name: 'Pad Thai',
    description:
      'Pad thai, or phad thai, is a stir-fried rice noodle dish commonly served as a street food and at most restaurants in Thailand as part of the countrys cuisine. It is typically made with rice noodles, chicken, beef or tofu, peanuts, a scrambled egg, and bean sprouts, among other vegetables.',
    price: 6,
    quantity: 11,
    imgUrl: '/images/pad-thai.jpeg',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const randomBbqName = (num) => {
  let nameArr = [];
  const names = [
    [
      'Kansas City',
      'Memphis Style',
      'Texas',
      'Smoked',
      'Glazed',
      'BBQ',
      'Honey BBQ',
      'Fire-smoked',
      'Classic',
      'Spicy',
      'Lean',
      'Moist',
    ],
    [
      'Brisket',
      'Chicken',
      'Burnt Ends',
      'Pulled Pork',
      'Rib Sandwich',
      'Chicken Sandwich',
      'Sausage',
    ],
  ];
  let i = 0;
  while (i <= num) {
    let name = `${names[0][Math.floor(Math.random() * 12)]} ${
      names[1][Math.floor(Math.random() * 7)]
    }`;
    if (!nameArr.includes(name)) {
      nameArr.push(name);
      i++;
    }
  }
  return nameArr;
};

const randomIndianName = (num) => {
  let nameArr = [];
  const names = [
    ['Vegetarian', 'Curried', 'Tandoori', 'Vindaloo', 'Naan with', 'Saffron'],
    ['Samosa', 'Chicken', 'Lamb', 'Shrimp', 'Curry', 'Chaat', 'Biryani'],
  ];
  let i = 0;
  while (i <= num) {
    let name = `${names[0][Math.floor(Math.random() * 6)]} ${
      names[1][Math.floor(Math.random() * 7)]
    }`;
    if (!nameArr.includes(name)) {
      nameArr.push(name);
      i++;
    } else {
      nameArr.push(`${name} Special #${i}`);
      i++;
    }
  }
  return nameArr;
};

const randomJapaneseName = (num) => {
  let nameArr = [];
  const names = [
    [
      'Teriyaki',
      'Spicy Tuna',
      'Shrimp',
      'Spicy ',
      'Hibachi',
      'Eel',
      'Salmon',
      'Katsu',
    ],
    [
      'Ramen',
      'Sashimi',
      'Sushi Roll',
      'Udon',
      'Chicken',
      'Shrimp',
      'Roll',
      'Beef',
      'Tempura',
      'Soba',
    ],
  ];
  let i = 0;
  while (i <= num) {
    let name = `${names[0][Math.floor(Math.random() * 8)]} ${
      names[1][Math.floor(Math.random() * 10)]
    }`;
    if (!nameArr.includes(name)) {
      nameArr.push(name);
      i++;
    }
  }
  return nameArr;
};

const randomThaiName = (num) => {
  let nameArr = [];
  const names = [
    ['Thai', 'Basil', 'Panang', 'Green', 'Peanut', 'Panang', 'Spicy', 'Bamboo'],
    [
      'Fried Rice',
      'Noodle Soup',
      'Curry',
      'Wok',
      'Chicken',
      'Red Snapper',
      'Spicy',
      'Salad',
      'Dumplings',
      'Hot Pot',
    ],
  ];
  let i = 0;
  while (i <= num) {
    let name = `${names[0][Math.floor(Math.random() * 8)]} ${
      names[1][Math.floor(Math.random() * 10)]
    }`;
    if (!nameArr.includes(name)) {
      nameArr.push(name);
      i++;
    } else {
      nameArr.push(`${name} Special #${i}`);
      i++;
    }
  }
  return nameArr;
};

const generateItems = () => {
  let bbqNum = 55;
  let indianNum = 35;
  let japaneseNum = 45;
  let thaiNum = 35;

  const bbqImg = ['bbq1.jpeg', 'bbq2.jpg', 'bbq3.jpeg', 'bbq4.jpg', 'bbq5.jpg'];
  const indianImg = [
    'indian1.jpg',
    'indian2.jpg',
    'indian3.jpeg',
    'indian4.jpg',
    'indian5.jpg',
  ];
  const japaneseImg = [
    'japan1.jpg',
    'japan2.jpg',
    'japan3.jpg',
    'japan4.jpg',
    'japan5.jpg',
  ];
  const thaiImg = [
    'thai1.jpg',
    'thai2.jpg',
    'thai3.jpg',
    'thai4.jpg',
    'thai5.jpg',
  ];
  const bbqNamesArray = randomBbqName(bbqNum);
  const indianNamesArray = randomIndianName(indianNum);
  const japaneseNamesArray = randomJapaneseName(japaneseNum);
  const thaiNamesArray = randomThaiName(thaiNum);

  for (let i = 0; i <= bbqNum; i++) {
    let food = {
      name: `${bbqNamesArray[i]}`,
      description:
        'Donec vel molestie massa, quis convallis metus. Nam nec erat non diam semper lobortis. Proin gravida vulputate scelerisque. Duis sit amet lacus quis libero mattis euismod viverra non turpis. Praesent volutpat et mauris vel mattis. Quisque turpis arcu, pulvinar eu metus ut, venenatis dapibus risus.',
      price: Math.floor(Math.random() * 30) + 10,
      quantity: Math.floor(Math.random() * 25),
      imgUrl: `images/${bbqImg[Math.floor(Math.random() * 5)]}`,
    };
    barbequeFood.push(food);
  }
  for (let i = 0; i <= indianNum; i++) {
    let food = {
      name: `${indianNamesArray[i]}`,
      description:
        'Donec vel molestie massa, quis convallis metus. Nam nec erat non diam semper lobortis. Proin gravida vulputate scelerisque. Duis sit amet lacus quis libero mattis euismod viverra non turpis. Praesent volutpat et mauris vel mattis. Quisque turpis arcu, pulvinar eu metus ut, venenatis dapibus risus.',
      price: Math.floor(Math.random() * 30) + 10,
      quantity: Math.floor(Math.random() * 25),
      imgUrl: `images/${indianImg[Math.floor(Math.random() * 5)]}`,
    };
    indianFood.push(food);
  }

  for (let i = 0; i <= japaneseNum; i++) {
    let food = {
      name: `${japaneseNamesArray[i]}`,
      description:
        'Donec vel molestie massa, quis convallis metus. Nam nec erat non diam semper lobortis. Proin gravida vulputate scelerisque. Duis sit amet lacus quis libero mattis euismod viverra non turpis. Praesent volutpat et mauris vel mattis. Quisque turpis arcu, pulvinar eu metus ut, venenatis dapibus risus.',
      price: Math.floor(Math.random() * 30) + 10,
      quantity: Math.floor(Math.random() * 25),
      imgUrl: `images/${japaneseImg[Math.floor(Math.random() * 5)]}`,
    };
    japaneseFood.push(food);
  }
  for (let i = 0; i <= thaiNum; i++) {
    let food = {
      name: `${thaiNamesArray[i]}`,
      description:
        'Donec vel molestie massa, quis convallis metus. Nam nec erat non diam semper lobortis. Proin gravida vulputate scelerisque. Duis sit amet lacus quis libero mattis euismod viverra non turpis. Praesent volutpat et mauris vel mattis. Quisque turpis arcu, pulvinar eu metus ut, venenatis dapibus risus.',
      price: Math.floor(Math.random() * 30) + 10,
      quantity: Math.floor(Math.random() * 25),
      imgUrl: `images/${thaiImg[Math.floor(Math.random() * 5)]}`,
    };
    thaiFood.push(food);
  }
};

// let i = 200;

// while (i >= 0) {
//   let randomFoodNum = Math.floor(Math.random() * 300);
//   let randomPrice = Math.floor(Math.random() * 30) + 10;

//   if (i > 150) {
//     let food = {
//       name: `Indian Food ${randomFoodNum}`,
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum turpis eu ultricies vestibulum. Nullam nec mi ex. In hac habitasse platea dictumst. Aliquam augue lorem, euismod nec nisl a, consequat pulvinar urna. Proin eu urna mattis, rutrum nisi et, feugiat justo. Nullam lobortis, leo non aliquet tempus, justo libero blandit ipsum, in lacinia massa ligula in dolor. Nullam vitae auctor sem, at fringilla est. Mauris sed ipsum justo. In a turpis felis. Integer aliquam ante quis gravida ultrices. Aliquam erat volutpat.',
//       price: randomPrice,
//       quantity: Math.floor(Math.random() * 25),
//     };
//     indianFood.push(food);
//   } else if (i > 100) {
//     let food = {
//       name: `${randomBbqName()}`,
//       description:
//         'Donec vel molestie massa, quis convallis metus. Nam nec erat non diam semper lobortis. Proin gravida vulputate scelerisque. Duis sit amet lacus quis libero mattis euismod viverra non turpis. Praesent volutpat et mauris vel mattis. Quisque turpis arcu, pulvinar eu metus ut, venenatis dapibus risus. Nam sapien mi, euismod eget rhoncus eu, accumsan sed ex. Fusce et sem ac lacus faucibus congue eu eu justo. Pellentesque cursus, nisl nec gravida condimentum, lorem sem cursus leo, ut cursus magna risus in ante. ',
//       price: randomPrice,
//       quantity: Math.floor(Math.random() * 25),
//     };
//     barbequeFood.push(food);
//   } else if (i > 50) {
//     let food = {
//       name: `Japanese Food - ${randomFoodNum}`,
//       description:
//         'Donec vulputate eros eu diam pretium tincidunt. Nunc tempor iaculis mollis. Curabitur sollicitudin pellentesque est, id tincidunt mauris mollis lacinia. Vivamus eget orci cursus, lobortis nulla eu, posuere dui. Aliquam erat volutpat. Ut ac maximus neque. Sed malesuada mauris lectus. Morbi nec bibendum lorem. Phasellus at arcu nec est feugiat efficitur a rutrum massa. Curabitur quis scelerisque ligula, a congue nisi. Pellentesque feugiat leo sit amet auctor venenatis. Sed lobortis gravida tellus quis dictum. Etiam viverra, sem ut tincidunt posuere, massa eros mollis dolor, ut tristique massa purus ac est. Suspendisse porta aliquam orci, quis aliquet quam sodales id.',
//       price: randomPrice,
//       quantity: Math.floor(Math.random() * 100),
//     };
//     japaneseFood.push(food);
//   } else {
//     let food = {
//       name: `Thai Food - ${randomFoodNum}`,
//       description:
//         'Aenean sagittis scelerisque viverra. Morbi maximus libero eget iaculis ultricies. Aenean finibus justo lectus. Donec condimentum, ligula eget fermentum venenatis, quam libero iaculis mauris, quis dictum metus tortor et risus. Donec viverra massa sed mauris tempus, eget facilisis massa dignissim. Sed dapibus nisl eu nisl molestie, et fringilla metus iaculis. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam at consectetur felis, et vehicula lacus. Donec accumsan laoreet sapien eu auctor. Etiam ligula dolor, ullamcorper eget quam vel, pulvinar consectetur risus.',
//       price: randomPrice,
//       quantity: Math.floor(Math.random() * 25),
//     };
//     thaiFood.push(food);
//   }

//   i--;
// }

//random items for random cart generation
const randomItems = () => {
  let productArray = [];
  let quantity = Math.floor(Math.random() * 5);
  while (productArray.length < quantity) {
    let prodId = Math.floor(Math.random() * 100 + 1);
    if (productArray.indexOf(prodId) <= 0) {
      productArray.push(prodId);
    }
  }
  return productArray;
};

async function seed() {
  generateItems();
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');
  try {
    const indian = await Category.create({ category_name: 'indian' });
    const barbeque = await Category.create({ category_name: 'barbeque' });
    const japanese = await Category.create({ category_name: 'japanese' });
    const thai = await Category.create({ category_name: 'thai' });

    await Promise.all(
      indianFood.map(async (product) => {
        let newProduct = await Product.create(product);
        return newProduct.setCategory(indian);
      })
    );
    await Promise.all(
      barbequeFood.map(async (product) => {
        let newProduct = await Product.create(product);
        return newProduct.setCategory(barbeque);
      })
    );
    await Promise.all(
      japaneseFood.map(async (product) => {
        let newProduct = await Product.create(product);
        return newProduct.setCategory(japanese);
      })
    );
    await Promise.all(
      thaiFood.map(async (product) => {
        let newProduct = await Product.create(product);
        return newProduct.setCategory(thai);
      })
    );
    //seed users with items in cart
    let newUsers = await Promise.all(
      users.map(async (user) => {
        return await User.create(user);
      })
    );

    //add random products and quantities to carts
    await Promise.all(
      newUsers.map(async (user) => {
        let newOrder = await user.createOrder();
        const productArray = randomItems();
        return Promise.all(
          productArray.map(async (id) => {
            await newOrder.addProduct(id);
            let newCart = await OrderDetails.findOne({
              where: {
                orderId: newOrder.id,
                productId: id,
              },
            });
            let product = await Product.findByPk(id);
            await newCart.update({
              price: product.price,
              quantity: Math.floor(Math.random() * 5 + 1),
            });
          })
        );
      })
    );
  } catch (error) {
    console.log(error);
  }

  // Creating Users

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
