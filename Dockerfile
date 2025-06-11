FROM node:18-alpine
WORKDIR /app
COPY backend/ .

RUN addgroup -S nodejs && adduser -S sondacs -G nodejs
RUN chown -R sondacs:nodejs /app

USER sondacs

RUN npm install
CMD ["node", "index.js"]