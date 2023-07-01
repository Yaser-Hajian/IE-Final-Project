# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the Node.js application listens on
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "start" ]