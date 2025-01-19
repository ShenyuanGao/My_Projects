# E-Commerce PERN

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Overview Functionality
This E-Commerce web app allow user to create account, choose their favourite product, add to cart, remove from cart, buy products, give personalized recommendation (in construction), manage order history, purcahse with paypal (using paypal payments API) or using debit or credit card. User can also review products bought

* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Flowbite](https://img.shields.io/badge/Flowbite-38BDF8?style=for-the-badge&logo=flowbite&logoColor=white)
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
* ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
* ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)
* ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)



## Getting started

This web app requires [Node.js](https://nodejs.org/) with npm to run.

This web app requires postgreSQL local instance with databse schema ready to run, existing database seedler is contained as database is connected

This web app requires you to create your own JWT secret key to start in .env file

This web app requires you to have a sandbox Paypal account to simulate Merchants, register a sandbox account and acquires your own Client_ID in environmental variable

Tables user, order, order\_items, products, shipping\_address, payment_result, reviews need to be created, connet through parameter below
```sh
PORT=5432
host=localhost
database=postgres
password=your_password
```

Install the dependencies and devDependencies and start the server.

```sh
cd front-end/my-app
npm run dev
```
Go to the link provided in terminal


For production environments...

```sh
--host for expose
```

## Roadmap

- [ ] Add full functionality to view a order in order history, in cancel, review, button
- [ ] Add href links for "Thank you for your purchase" page for orde created
- [ ] Add reviews functionality, reviews text href a review page
- [ ] Optimization for re-rendering
- [ ] Multi-language Support
    - [ ] Chinese


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Chenhewu - wu509@mcmaster.ca
Project Link: [E-commerce PERN](https://github.com/tomwuchenhe/e-comm-PERN)

