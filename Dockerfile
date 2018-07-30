# Using Node 8
FROM node:8
# Move into a tmp directory, and install dependencies
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install
# Move into an app directory, and copy dependencies and project over
WORKDIR /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/
ENV NODE_ENV=production
# Run build, and copy build folder to mounted volume
CMD ["make", "build-fe"]
RUN cp -a /usr/src/app/dist /dockerdist
# TODO: Need a way to then run the build process but have the built files outputted to the actual machine.
