# Trueke

Trueke facilitates the exchange of furniture items among individuals, promoting sustainability and community interaction. Users can effortlessly list their unwanted furniture, specifying desired items for exchange. Other members within the same region or city can view these listings and make offers for exchanges.

This project was generated with

## Prerequisites
- *PostgreSQL* database running (on port 5432 as default). Don't forget to check the `DB_DATABASE=` property in the `.env` file. It must exist a database with the same name as is written in this property.
- *.env* file on the root folder containing all the environment configuration. Just use or modify the `.env.example` without the `.example` extension.

## Running local example

### option 1
1- Open a terminal and navigate to the root directory of the Laravel project, called 'trueke'

2 - Install PHP dependencies
Ensure you have Composer installed. If not, download it from getcomposer.org.

```bash
composer install
```

3 - Run Migrations and Seeders
Run database migrations to set up your database schema:

```bash
php artisan migrate
```

Optionally, you can seed the database with sample data:

```bash
php artisan db:seed
```

4 - Start the Laravel development server

```bash
php artisan serve
```

This will start a development server at http://localhost:8000. If you seed the database under a local or dev environment, there are two test users you can use, each one with some pieces of furniture:

```
user1@test.com
pass: test1
```

```
user2@test.com
pass: test2
```

### option 2
Make sure you have Docker installed on your machine.

1- Open a terminal and navigate to the root directory of the Laravel project, called 'trueke'.

2- Build the Docker image using the following command:

```bash
docker build -t trueke-api .
```

3- After successfully building the Docker image, you can run a Docker container from the image using the following command:

```bash
docker run -it --rm -p 8000:8000 trueke-api
```

This will start a development server at http://localhost:8000.
