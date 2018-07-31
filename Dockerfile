# Using Node 8
FROM node:8
# Move into a tmp directory, and install dependencies
WORKDIR /tmp
COPY package.json /tmp/
RUN npm i -g yarn
RUN chmod +x /usr/local/bin/yarn
RUN yarn
# Move into an app directory, and copy dependencies and project over
WORKDIR /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/
COPY . /usr/src/app/
ENV NODE_ENV=production
# Run build, and copy build folder to mounted volume
RUN make docker-build-fe
CMD ["cp", "-rv", "/usr/src/app/dist/.", "/dockerdist/"]
