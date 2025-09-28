require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const fs = require('fs');
const path = require('path');

async function migrateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Read products from JSON file
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const raw = fs.readFileSync(dataPath);
    const products = JSON.parse(raw);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    for (const productData of products) {
      const { id, ...productWithoutId } = productData; // Remove the old id field
      const product = new Product(productWithoutId);
      await product.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateProducts();