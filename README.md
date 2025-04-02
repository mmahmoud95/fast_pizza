# Fast Pizza React App

Fast Pizza is a React web application for managing pizza orders, cart, and menu. Built using **React**, **Vite**, **Redux Toolkit**, and **TypeScript**, it allows users to browse the menu, add items to the cart, and place orders easily.

## Features

- **Menu**: Browse the menu with a list of pizza items including name, price, and ingredients.
- **Cart**: Add items to the cart, view the cart, and update item quantities.
- **Order**: Create an order by selecting items from the cart and submitting customer details.
- **Search Orders**: Allows searching for existing orders based on order ID.
- **User Management**: Put Your name.
- **Geolocation API**: Reverse geocode coordinates to get location details.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Demo

Check out the live demo: [Fast Pizza App](https://fast-pizza-app-demo.example.com)

## Requirements

Make sure you have the following installed before setting up the project:
- **Node.js** (recommended version: 16+)
- **npm** or **Yarn** for package management

## Setup

### 1. Clone the repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/mmahmoud95/fast-pizza.git
```

### 2. Install dependencies

Navigate to the project directory and install the dependencies:

Using npm:
```bash
cd fast-pizza
npm install
```

Or using Yarn:
```bash
cd fast-pizza
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following configuration:

```env
VITE_API_URL=https://example.com/api
VITE_GEOLOCATION_API_URL=https://api.bigdatacloud.net/data/reverse-geocode-client
```

### 4. Start the development server

Run the following command to start the development server:

Using npm:
```bash
npm run dev
```

Using Yarn:
```bash
yarn dev
```

Your app will be live at http://localhost:5173.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production



## Technologies Used

- **React**: For building the user interface.
- **Redux Toolkit**: For state management across the app.
- **Vite**: A fast and efficient bundler for frontend projects.
- **TypeScript**: For static typing and better developer experience.
- **TailwindCSS**: For utility-first styling.
- **React Router**: For navigation and routing.
- **API Services**: Handles geolocation and restaurant data requests.

## Key Features Implementation

### Menu System
The menu system fetches pizza data from the API and displays it with filtering options.

### Cart Management
The cart uses Redux Toolkit for state management, allowing users to:
- Add items to cart
- Update quantities
- Remove items
- Calculate totals

### Order Processing
Users can place orders with delivery details and view order status.

### Geolocation
The app uses browser geolocation API to determine the user's location for delivery.

## API Documentation

The app interacts with the following endpoints:

- `GET /menu` - Retrieves the menu items
- `POST /order` - Creates a new order
- `GET /order/:id` - Retrieves a specific order
- `GET /address?lat=xxx&lng=xxx` - Retrieves address details based on coordinates


## Deployment

To deploy the app to production:

1. Build the app: `npm run build`
2. The build output will be in the `dist` directory
3. Deploy the contents of the `dist` directory to your hosting provider


## License

This project is licensed under the MIT License.

