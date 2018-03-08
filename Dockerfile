FROM node:9

RUN npm i -g nodemon

COPY install.sh /usr/local/bin/bootstrap_install
RUN chmod +x /usr/local/bin/bootstrap_install

RUN chown -R node:node /usr/local/bin /usr/local/lib/node_modules


USER node
WORKDIR /home/node

CMD bootstrap_install
