FROM node:argon

# Create app directory
RUN mkdir -p D:/TP-NOSQL/app
WORKDIR D:/TP-NOSQL/app

# Install app dependencies
COPY package.json D:/TP-NOSQL/app/
RUN npm install

# Bundle app source
COPY . D:/TP-NOSQL/app

EXPOSE 8080
CMD [ "npm", "start" ]