FROM nginx:latest

WORKDIR /usr/app

COPY ./frontend/build ./build
