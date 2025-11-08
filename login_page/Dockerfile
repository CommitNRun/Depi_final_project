# 1️⃣ Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# 2️⃣ Production stage
FROM nginx:stable-alpine

# Copy build output to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
