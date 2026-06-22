\# CodeVector Backend Task



\## Overview



This project is a backend system for browsing \~200,000 products with support for:



\* Fetching products ordered by newest first

\* Filtering by category

\* Fast pagination using cursor-based pagination

\* Handling live inserts without duplicates or skipped products



\---



\## Tech Stack



\* Node.js

\* Express.js

\* PostgreSQL

\* Prisma ORM



\---



\## Database Design



\### Product Schema



\* `id` (UUID, Primary Key)

\* `name`

\* `category`

\* `price`

\* `created\_at`

\* `updated\_at`



\### Indexes



```sql

CREATE INDEX idx\_products\_updated\_id

ON products(updated\_at DESC, id DESC);



CREATE INDEX idx\_products\_category\_updated\_id

ON products(category, updated\_at DESC, id DESC);

```



These indexes make pagination and filtering fast.



\---



\## API Endpoints



\### Get Products



```http

GET /products

```



Returns latest products (default 20).



\---



\### Filter by Category



```http

GET /products?category=electronics

```



Returns products only from selected category.



\---



\### Cursor Pagination



```http

GET /products?cursor=<cursor>

```



Returns next set of products.



Cursor contains:



```json

{

&#x20; "updated\_at": "...",

&#x20; "id": "..."

}

```



\---



\### Live Insert Simulation



```http

POST /products/add

```



Inserts 50 new products to simulate concurrent updates.



\---



\## Why Cursor Pagination?



Offset pagination:



```sql

LIMIT 20 OFFSET 40

```



Problems:



\* Slow on large datasets

\* Can show duplicates

\* Can skip rows if new data is inserted



Cursor pagination:



```sql

WHERE (updated\_at, id) < (cursor\_updated\_at, cursor\_id)

```



Advantages:



\* Faster

\* Stable

\* No duplicates

\* No skipped rows



\---



\## Seeding Data



Run:



```bash

npm run seed

```



This inserts 200,000 products in batches of 5000.



Why batching?



\* Faster than inserting one by one

\* Reduces database round-trips



\---



\## Running Project



Install dependencies:



```bash

npm install

```



Run migrations:



```bash

npx prisma migrate dev

```



Seed database:



```bash

npm run seed

```



Start server:



```bash

npm run dev

```



\---



\## Performance



\* Batch insert: O(n)

\* Cursor query: O(log n + k)

\* Filtering with indexes: optimized



\---



\## Improvements with More Time



\* Add authentication

\* Add caching with Redis

\* Add API rate limiting

\* Add frontend UI

\* Add product update endpoint



\---



\## AI Usage



AI was used for:



\* discussing architecture choices

\* validating cursor pagination logic

\* reviewing Prisma setup issues



Manual debugging:



\* Prisma v7 datasource changes

\* Prisma client initialization errors

\* PostgreSQL local setup



