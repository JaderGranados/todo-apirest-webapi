FROM node:12.18-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm --save install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]
