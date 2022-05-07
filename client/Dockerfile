# Create a base image with dependencies
FROM node:16.15.0-alpine3.14 AS base
ENV NPM_CONFIG_LOGLEVEL warn

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
RUN chmod -R 777 /app && chown -R app:app /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .


# Generate build
FROM base AS builder
ENV NODE_ENV production

RUN yarn build


# Create a production image
FROM nginx:1.21.6-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
