# Stage 1: Build React app
FROM node:20 AS build
WORKDIR /app

# Copy package.json first and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variables for backend services
# These will be replaced in the React build
ARG REACT_APP_API_BASE_URL=http://backend:5000
ARG REACT_APP_APPOINTMENTS_URL=http://appointments-service:5001
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_APPOINTMENTS_URL=$REACT_APP_APPOINTMENTS_URL

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy built app to Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
