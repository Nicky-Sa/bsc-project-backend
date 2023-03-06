FROM node:19.6.0

RUN apt-get -q update && apt-get -qy install netcat
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn prisma generate
RUN chmod 755 docker-entrypoint.sh
EXPOSE 5005
CMD ["yarn", "run", "up:production"]