FROM node:18.19.1-alpine AS build

ARG BACKEND_URL

WORKDIR /app

RUN apk update

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine

COPY .ops/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/messenger-ui/browser /usr/share/nginx/html

EXPOSE 80