// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Initialize Sequelize (using SQLite for simplicity)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Address model
const Address = sequelize.define('Address', {
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define one-to-many relationship
User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

// Sync database
sequelize.sync();

// POST route to register user and address
app.post('/register', async (req, res) => {
  const { name, address } = req.body;
  try {
    const user = await User.create({ name });
    await Address.create({ address, userId: user.id });
    res.status(201).send('User and Address saved successfully');
  } catch (error) {
    res.status(400).send('Error saving data');
  }
});

// POST route to add a new address for an existing user
app.post('/user/:userId/address', async (req, res) => {
    const { userId } = req.params;
    const { address } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Add the new address to the user
      await Address.create({ address, userId: user.id });
      res.status(201).send('Address added successfully');
    } catch (error) {
      res.status(400).send('Error adding address');
    }
  });
  

// Get the adderess of the specified user
app.get('/user/:userId/addresses', async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
        include: Address  // Include associated addresses
      });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).json({
        user: user.name,
        addresses: user.Addresses  // Send associated addresses
      });
    } catch (error) {
      res.status(400).send('Error fetching addresses');
    }
  });

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
