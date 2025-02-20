# Use a minimal Node.js image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies (including devDependencies like TypeScript)
RUN npm ci

# Copy the source code (including TypeScript files)
COPY . .

# Build the application (compile TypeScript into JavaScript)
RUN npm run build

# Expose the port your app runs on (optional)
EXPOSE 8080

# Start the application
CMD ["node", "dist/index.js"]