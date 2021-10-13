# syntax=docker/dockerfile:1

# Start from ECR electron-ros image with Node, ROS, and Electron dependencies.
# FROM electron-ros:latest AS base
FROM 770790627165.dkr.ecr.us-west-2.amazonaws.com/electron-ros:latest AS base
WORKDIR /usr/src/app
COPY package.json ./

# Install npm dependencies
# source ros from install or outside?

# cache dependencies todo
FROM base AS dependencies
# COPY --from=base 
WORKDIR /usr/src/app
# COPY --chmod=0755 entrypoint.sh .
COPY ./ ./
SHELL ["/bin/bash", "-c"]
RUN source /opt/ros/foxy/setup.bash && npm install --verbose
# need node-sass rebuild here?
CMD ["npm", "run", "release"]

# CMD ["bash", "entrypoint.sh"]

# source ros prior to rclnodejs install
# SHELL ["/bin/bash", "-c"]
# RUN source /opt/ros/foxy/setup.bash

#  ["./entrypoint.sh"]
# RUN echo 'hey'
# RUN npm install --verbose

# # rebuild rclnodejs
# # RUN npm rebuild rclnodejs --update-binary

# # Build AppImage and release to S3
# FROM dependencies AS release
# WORKDIR /usr/src/app
# COPY --from=dependencies usr/src/app/node_modules ./node_modules
# COPY . .
# # aws creds
# ENTRYPOINT npm run release

# https://medium.com/hackernoon/a-tale-of-two-docker-multi-stage-build-layers-85348a409c84
# FROM node:11-alpine AS build
# RUN apk add --update --no-cache \
#     python \
#     make \
#     g++
# COPY . /src
# WORKDIR /src
# RUN npm ci
# RUN npm run format
# RUN npm run build
# RUN npm run test
# RUN npm prune --production
# FROM node:11.10.0-alpine
# EXPOSE 1234
# WORKDIR /usr/src/service
# COPY --from=build /src/node_modules node_modules
# COPY --from=build /src/dist dist
# USER node
# CMD ["node", "./dist/server/index.js"]


