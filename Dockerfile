FROM node:18
WORKDIR /app
COPY backend/ .
RUN npm install
CMD ["node", "index.js"]