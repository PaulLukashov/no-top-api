FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --legacy-peer-deps
ADD . .
RUN npm run build 
RUN npm prune --legacy-peer-deps --production
CMD [ "node", "./dist/main.js" ]