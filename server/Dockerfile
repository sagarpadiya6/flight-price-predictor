FROM node:16.15.0-alpine3.14 as base

RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache make

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
RUN chmod -R 777 /app && chown -R app:app /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies - copy as chown app for npm install to be successful
COPY --chown=app:node package*.json ./
RUN npm install

# Bundle app
COPY --chown=app:node . .


FROM base as production
ENV NODE_ENV production

EXPOSE 4005
CMD ["npm", "start"]
