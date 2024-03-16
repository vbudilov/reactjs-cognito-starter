# Use an official Node runtime as a parent image
FROM node:21-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
