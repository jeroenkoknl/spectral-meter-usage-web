# Meter Usage Web Server

This is the second application build for the assignment of Spectral. This web server acts as a protocol bridge between the gRPC protocol exposed by the Meter Usage microservice and HTTP protocol. This application also serves a web page that gets the meter values from the HTTP endpoint in JSON format and displays it in a table.

## How to run

This application runs on Node version 10. A convenient way of installing Node is by using [Node Version Manager](https://github.com/nvm-sh/nvm). After installing the `nvm` command line, you can run the following command to install Node.js version 10:

```
nvm install 10 -lts
```

Next you can install all dependencies by running the following command:

```
npm install
```

You can start the server by running the following command:

```
npm run dev
```

You can view the web page by going to: 

```
http://localhost:3000/
```

The Web API endpoint for getting the measurments can be called on this URL:

```
http://localhost:3000/api/measurements
```

This application expects the Meter Usage service to be available on `localhost` port `50051`.

## Node

I have chosen to build this application on Node because it allows you to build a web server and frontend using the same language: javascript. Node is also very well suited for the purpose of being a bridge or gateway to backend services because of its asynchronous nature. IO operations are non-blocking by default allowing for many concurrents requests without much resource consumption and blocked threads.

## Express

The web framework [Express](https://expressjs.com/) is used to serve both the Web API endpoint and the static HTML page. 

## Bootstrap Table

[Bootstap Table](https://bootstrap-table.com/) is used to both retrieve and display the meter values in a table. Although I have never used this component before it appeared to be very well suited for this purpose. There was no need to write any client side javascript for it and all scripts and CSS could be included from the available CDNs.

# Docker

Even though I have not been able to fully automate the build and deployment process this is a [Dockerfile](./Dockerfile) included to run the server in a container.

To build the Docker image, you could run the folowing command:

```
docker build -t spectral-meter-usage-web:0.1.0 .
```





