# Petspot - Modern Pet E-commerce Platform

A full-stack, modern e-commerce application for pet sales with cloud-based cart and order management using MongoDB Atlas. Built with React and Node.js with a beautiful, responsive design.

## Features

- **User Authentication**: Sign up and login functionality
- **Cloud-based Cart**: Cart items are saved to MongoDB Atlas and persist across sessions
- **Product Catalog**: Browse and view pet products
- **Add to Cart**: Add products to cart with cloud synchronization
- **Checkout**: Complete orders with address saving and Razorpay payment integration
- **Order Management**: Orders are saved to the cloud with user details

## Tech Stack

**Backend:**
- Node.js with Express
- MongoDB Atlas (Cloud Database)
- Mongoose ODM
- Razorpay Payment Gateway
- bcryptjs for password hashing

**Frontend:**
- React 19
- React Router for navigation
- Axios for API calls
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (already configured)

### Quick Start (Recommended)

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Migrate products to MongoDB (run this once):
   ```bash
   npm run migrate
   ```

3. Start both backend and frontend:
   ```bash
   npm run dev
   ```

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Migrate products to MongoDB (run this once):
   ```bash
   npm run migrate
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will run on http://localhost:5000

#### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   
   The frontend will run on http://localhost:3000

## Usage Flow

1. **Registration**: New users can sign up with name, email, and password
2. **Login**: Users login with email and password
3. **Browse Products**: View available pets on the products page
4. **Add to Cart**: Click "Add to cart" on any product (requires login)
5. **View Cart**: Cart items are automatically synced with the cloud
6. **Checkout**: Fill in shipping address and complete payment
7. **Order Confirmation**: Orders are saved to MongoDB with all details

## Key Features Implemented

### Cloud-Based Cart System
- Cart items are stored in MongoDB Atlas
- Cart persists across browser sessions
- Real-time synchronization when adding/removing items
- User-specific cart isolation

### Authentication Integration
- Login redirects to home page
- Cart loads automatically after login
- User information pre-fills checkout form
- Logout clears local session

### Order Management
- Complete order details saved to cloud
- User address information stored
- Payment integration with Razorpay
- Cart automatically cleared after successful order

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

**Products:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

**Cart:**
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/:userId` - Get user's cart items
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear/:userId` - Clear entire cart

**Orders:**
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:userId` - Get user's orders

## Environment Variables

The application is pre-configured with:
- MongoDB Atlas connection
- Razorpay test keys
- API base URL

## Database Schema

**Users:**
- name, email, password (hashed)

**Products:**
- name, price, category, image, description

**Cart Items:**
- productId, name, price, qty, image, userId

**Orders:**
- userData (userId, name, email, phone, address)
- cart items array
- totalAmount, paymentId, createdAt

## Notes

- The application uses MongoDB Atlas cloud database
- Cart data is automatically synchronized
- All user data and orders are stored securely in the cloud
- Payment integration is set up with Razorpay test mode

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...

