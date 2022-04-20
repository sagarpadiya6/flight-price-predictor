FROM node:16-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Bundle app
COPY . .

CMD ["npm", "start"]
