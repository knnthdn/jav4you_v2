FROM ghcr.io/puppeteer/puppeteer:24.1.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
COPY . .
CMD ["start","next start"]