FROM node:20

WORKDIR /weather
COPY . .
# RUN export NODE_ENV=prod
# RUN export ENV_VARIABLE=test
RUN npm cache clean --force && npm install
RUN npm run build

# CMD ["npm", "run", "start"]

