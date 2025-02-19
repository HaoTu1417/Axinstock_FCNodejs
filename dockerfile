# Use the official Node.js image as a base
FROM node:18.20.5-alpine3.21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
#RUN npm install

# Copy all files from the current directory to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the Node.js application
CMD [ "node", "main.js" ]
