# stage 1

FROM node:14.18-alpine as node
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=node /app/dist/kurento-monitoring-frontend /usr/share/nginx/html