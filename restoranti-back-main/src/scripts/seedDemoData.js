const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const initDb = require('../config/initDb');
const User = require('../models/User');
const Product = require('../models/Product');

const users = [
  {
    fullName: 'Admin User',
    email: 'admin@restaurant.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    fullName: 'Demo Waiter',
    email: 'waiter@restaurant.com',
    password: 'waiter123',
    role: 'kamarier'
  },
  {
    fullName: 'Demo Client',
    email: 'client@restaurant.com',
    password: 'client123',
    role: 'client'
  }
];

const products = [
  {
    name: 'Bruschetta with Tomatoes and Basil',
    description: 'Toasted bread with tomatoes, basil, olive oil, and seasoning.',
    category: 'starter',
    price: 2.0,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80',
    tags: 'vegetarian,starter'
  },
  {
    name: 'Pasta Carbonara',
    description: 'Classic pasta with creamy sauce, pancetta, and parmesan.',
    category: 'main',
    price: 8.5,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80',
    tags: 'pasta,main'
  },
  {
    name: 'Chicken Salad',
    description: 'Fresh salad with grilled chicken and seasonal vegetables.',
    category: 'main',
    price: 6.5,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    tags: 'salad,healthy'
  },
  {
    name: 'Fanta',
    description: 'Orange soft drink.',
    category: 'drink',
    price: 2.0,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=900&q=80',
    tags: 'drink'
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake slice.',
    category: 'dessert',
    price: 3.5,
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    tags: 'dessert'
  }
];

const seedDemoData = async () => {
  try {
    await sequelize.authenticate();
    await initDb();

    for (const user of users) {
      const existing = await User.findOne({ where: { email: user.email } });
      const password = await bcrypt.hash(user.password, 10);

      if (existing) {
        await existing.update({
          fullName: user.fullName,
          password,
          role: user.role
        });
      } else {
        await User.create({
          fullName: user.fullName,
          email: user.email,
          password,
          role: user.role
        });
      }
    }

    const admin = await User.findOne({ where: { email: 'admin@restaurant.com' } });

    for (const product of products) {
      const existing = await Product.findOne({ where: { name: product.name } });

      if (existing) {
        await existing.update(product);
      } else {
        await Product.create({
          ...product,
          createdByAdminId: admin ? admin.id : null
        });
      }
    }

    console.log('Demo users and products seeded successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedDemoData();
