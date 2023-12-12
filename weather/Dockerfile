FROM node:20

WORKDIR /weather
COPY . .
RUN npm install && npm cache clean --force
RUN npm install -g nodemon ts-node

CMD ["npm", "run", "dev"]

