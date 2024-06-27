# Trueke

Trueke facilitates the exchange of furniture items among individuals, promoting sustainability and community interaction. Users can effortlessly list their unwanted furniture, specifying desired items for exchange. Other members within the same region or city can view these listings and make offers for exchanges.

## Prerequisites
- [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.
- trueke API running. head to `trueke` folder and follow the instructions in the README file

## Running local example

### option 1
1- Open a terminal and navigate to the root directory of the Angular project, called 'trueke-front'

2- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### option 2
Make sure you have Docker installed on your machine.

1- Open a terminal and navigate to the directory where your Dockerfile is located (root directory of your Angular project) called 'trueke-front'.

2- Build the Docker image using the following command:

```bash
docker build -t trueke-front .
```

3- After successfully building the Docker image, you can run a Docker container from the image using the following command:

```bash
docker run -it --rm -p 4200:4200 trueke-front
```

4- open a web browser and the platform should be running on `http://localhost:4200`

## Build for production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
