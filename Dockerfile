FROM node:18-alpine
WORKDIR /backend
COPY package.json ./
RUN yarn add pm2 -g
RUN yarn cache clean && yarn --update-checksum && yarn 
COPY . ./
EXPOSE 3001
CMD ["yarn", "dev"]