# Use the official Node.js 22 image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Expose your app’s port (React, Next.js, or Express)
EXPOSE 3000

# Default command (you can change if needed)
CMD ["npm", "run", "dev"]
