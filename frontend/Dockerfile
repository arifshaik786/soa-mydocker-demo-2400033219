
# Stage 1: Build the React + Vite application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# Configure backend URL for local browser access
ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the production frontend
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Remove default Nginx page and copy React build
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Container listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
