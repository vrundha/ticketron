FROM node:16-slim
WORKDIR /app
COPY . /app
ADD start.sh /
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

RUN cd /app/my-app && npm install
WORKDIR /app

EXPOSE 8080
CMD ["/start.sh"]