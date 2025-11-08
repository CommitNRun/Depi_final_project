# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose the port backend listens on
EXPOSE 5000

# Run the backend
CMD ["node", "server.js"]
