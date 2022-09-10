FROM node:17

WORKDIR /server

COPY . /server
RUN npm i

COPY . /server

EXPOSE 5000

CMD ["node", "server.js"]