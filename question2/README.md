# Question 2

## Demo Website
[http://ec2-13-212-9-161.ap-southeast-1.compute.amazonaws.com](http://ec2-13-212-9-161.ap-southeast-1.compute.amazonaws.com)

## Building Environment

1. npm@6.9.0
2. node@10.15.3
3. mongodb@3.7.5

## Development

### `npm install`

Install project dependencies

### `npm run start:server`

Back-end erver will be running at [http://localhost:8080](http://localhost:8080)

### `npm run start:app`

Front-end server will be running at [http://localhost:3000](http://localhost:3000)

### `npm start`

Start both back-end and front-end server

### `npm run test`

Running test

## Production

### `npm run build`

Prepare production build files. Files will be ready in `/build` directory.

### `npm run serve`

Serve back-end server.

------

## API reference

### `GET: api/product`

Get products grouped by category.

### `POST api/product/details`
Request body: 

`{ skus: string[] }`

Get product details by array of skus.

### `GET api/transaction/:transactionID`

Get transaction details by transactionID.

### `POST api/transaction/summary`

`{ products: { SKU: string, quantity: number }[] }`

Get calculated price details details.

### `POST api/transaction/checkout/:transactionID`

Perform checkout. 