FROM node:12-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV ${NODE_ENV:-development}
# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
