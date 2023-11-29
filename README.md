# Shop tech server - FUNiX Assignment
## Overview 
1. Login/Sign up for client and login for admin.
2. Place to order products then send confirm orders.
3. Check list history orders and details.
4. Admin overview business
5. Admin watching all products, creating and updating.
6. Admin watching all orders, which was ordered by client.
## Technologies 
- Node.js + Express
- Database NoSQL Mongodb
- REST API
##  Deployment:
#### 1. Running on local: http://localhost:5000
a. Downloading packages
```
npm install
```
b. Start server
```
npm start
```
- Deploying API: https://server-shop.vercel.app
- Deploying UI for Client: https://shop-ten-theta.vercel.app/

### List APIs
### 1. For Client:

| Endpoint | Method | Description |
|---|---|--- |
| /api/v1/login | POST |
| /api/v1/signup| POST |
| /api/v1/trending | GET | Show up list products |
| /api/v1/product/:id | GET | gets details product |
| /api/v1/relative/product/:id | GET | Gets relative product by category |
| /api/v1/place-order | POST | Place to order for user |
| /api/v1/order | GET | Get list history order | 
| /api/v1/detail/order | GET | Gets details order |

### 2. For Admin

| Endpoint | Method | Description |
|---|---|--- |
| /admin/api/v1/login | POST | |
| /admin/api/v1/list-product | GET | Gets all products from admin |
| /admin/api/v1/list-order | GET | get all history orders for administrator 
| /admin/api/v1/overview | GET | Statistics data business |
| /admin/api/v1/list-category | GET | Get all category |
| /admin/api/v1/add-product | POST | Create new product |
| /admin/api/v1/product | GET | get details product to update |
| /admin/api/v1/product | GET | Updating product action |


## Database Schema

![Schema](https://i.postimg.cc/7LCVXCN6/schema.png)

Note: Other UML at schema.drawio file at root directory

