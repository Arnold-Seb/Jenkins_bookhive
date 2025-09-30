FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN chmod +x node_modules/.bin/eslint

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
