# ==============================
# Stage 1: Build React App
# ==============================
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production application
RUN npm run build


# ==============================
# Stage 2: Serve using Nginx
# ==============================
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]