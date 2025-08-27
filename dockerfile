# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and lock files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the Next.js app
RUN npm run dev

# Step 7: Expose the port Next.js runs on
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]
