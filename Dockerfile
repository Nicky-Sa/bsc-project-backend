FROM node:19

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 5000
RUN yarn prisma generate
RUN yarn run prebuild
RUN yarn run build
CMD ["yarn", "run", "start:prod"]
