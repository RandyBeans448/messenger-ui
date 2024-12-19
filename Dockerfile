FROM node:18.19.1-alpine AS build

ARG BACKEND_URL

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:stable-alpine

COPY --from=build /app/dist/messenger-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
