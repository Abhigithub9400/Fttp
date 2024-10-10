# Stage 1: Build the application
FROM ubuntu:22.04 AS build-stage

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory inside the container
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM ubuntu:22.04 AS production-stage

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove the default Nginx configuration
RUN rm /etc/nginx/sites-enabled/default

# Copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/

# Copy built files from build-stage
COPY --from=build-stage /app/dist /var/www/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]