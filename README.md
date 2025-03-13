# CAFETERIA (NEXTJS + REDUX + NODEJS + MYSQL)

## Background / Purpose

The era of delivery has arrived due to the changing lifestyles of modern people. According to MIC's research on delivery services, usage stands at around 80%. To keep up with the times, The Cafe has decided to create its website with an ordering service to offer more choices for its clients.

The project is an optimized version of [AC Cafe](https://tonia83731.github.io/ACcafe-vite/), with the following imporvement:

- **Backend refactoring**: Replaced with a personally developed backend and database, enhancing stability and scalability
- **Role-Based Platform Split**: Provided separate frontend and backend stage for users based on their roles (public, user(members), staff), ensuring clear functionality and smooth operation
- **Data Storage Optimization**: Migrated Wishlist and Cartlist from LocalStorage to MySQL database, improving data access efficiency and consistency
- **Focused Purchase Process**: Removed the News page, simplifying content to allow users to focus more on ordering and shopping experiences
- **Multilingual Support**: Users can freely switch between Chinese and English interfaces based on their preferences
- **Coupon System**: Added a Coupon page and functionality, allowing users to apply discounts during checkout, enhancing purchase motivation
- **Enhanced Order Management**: Frontend and backend stage can now manage Order Status, allowing users to view order details and instantly update order statuses
- **Customization Options**: Added size, sweetness, and ice options for drink products, providing a more personalized ordering experience

## TARGET USER

- Long-term customers who are accustomed to online ordering, especially those with a strong passion for coffee

- Busy office workers, freelancers or individuals who enjoy relaxing at home with a cup of coffee (tea)

## USER STORIES

**Experiences that do not require membership:**

- Users can view the full product list and browse products by categories: Coffee, Tea, Ice Products, Desserts; or search to find products.
- Users can view the latest 5 reviews and also leave their own reviews.

**Experiences that require login:**

- To access the following experiences, users must register for an account.
- After registration, users must log in via the login page.
- Users can add products to their shopping cart; for coffee or tea products, they need to select **size, sweetness, and ice level**.
- Users can add or remove products from their wishlist and view the wishlist page.
- Users can view the products in their shopping cart and adjust **quantity**, **size, sweetness, and ice level**.
- Users can view their personal information and adjust content based on their preferences.
- Users can view existing orders and their details (including products, customization options, and current order status).
- Users can view available coupons and use them during checkout.
- After modifying the shopping cart, users can submit the order.

## DEMO

- [THE CAFE | STAFF](https://cafeteria-staff-frontend.vercel.app)
  - For project development, please visit [cafeteria-frontend-staff](https://github.com/tonia83731/cafeteria-frontend-staff)
- [THE CAFE](https://cafeteria-frontend-chi.vercel.app)

- For STAGE 1 (AC Cafe), please visit [ACcafe-vite](https://github.com/tonia83731/ACcafe-vite)

## PROJECT ROLES

- **Fullstack developer**: Provide API based on the requirements and visualized the result by developing an app

## CHALLENGES

- PROBLEMS: **How to save order amount, including Product Amount, Tax, Discount, Total Amount and use in different components**?
  - SOLUTION: Use **Redux** for state management. When the orderlist changes, track it using `useEffect` and update the data by dispatching actions with `useDispatch`

## TOOLS

- next @15.0.3
- next-intl 3.25.3
- react @18.3.1
- react-dom @18.3.1
- cookies-next @5.0.2
- tailwindcss @3.4.1
- eslint @8
- @reduxjs/toolkit @2.5.0
- react-redux @9.2.0
- react-slick @5.8.3
- slick carousel @1.8.1
- validator @13.12.0
- react-toastify @10.0.6
- react-icons @5.3.0
- dayjs @1.11.13
- react-select @5.8.3
- typescript @5

## FURTHER DEVELOPMENT

- Consider integerating a third-party payment platform to offer **debit and credit cart** payment options. Implement **3D verifications** to ensure the security of transactions
- Consider adding customer service area: user can raise order-related issues and received a real-time responses from customer support
- Consider delivery time estimated based on distance
- Reconsider adding a NEWS page

## PROJECT SETUP

```sh
git clone https://github.com/tonia83731/cafeteria-frontend.git
```

```sh
npm install
```

```sh
npm run dev
```
