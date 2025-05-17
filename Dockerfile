FROM node:22-slim

WORKDIR /src

# Copy only dependency files first (for better caching)
COPY package.json yarn.lock ./

# Install dependencies with increased network timeout
RUN yarn install --network-timeout 60000

# Now copy the rest of your app
COPY . .

# Start the dev server when the container runs
CMD ["yarn", "dev"]
