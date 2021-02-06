FROM node:12-alpine
MAINTAINER info@vizzuality.com

ENV NAME ct-ui
ENV USER ct-ui

RUN apk update && apk upgrade && \
    apk add --no-cache --update bash git openssh python alpine-sdk

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

RUN yarn global add --unsafe-perm grunt-cli bunyan pm2 bower

RUN mkdir -p /opt/$NAME
COPY bower.json /opt/$NAME/bower.json
COPY .bowerrc /opt/$NAME/.bowerrc
COPY package.json /opt/$NAME/package.json
COPY yarn.lock /opt/$NAME/yarn.lock
COPY angular.json /opt/$NAME/angular.json
COPY tsconfig.json /opt/$NAME/tsconfig.json
COPY tsconfig.spec.json /opt/$NAME/tsconfig.spec.json
COPY karma.conf.js /opt/$NAME/karma.conf.js
RUN cd /opt/$NAME && yarn install
RUN cd /opt/$NAME && bower install

COPY entrypoint.sh /opt/$NAME/entrypoint.sh

WORKDIR /opt/$NAME

COPY ./src /opt/$NAME/src
RUN chown -R $USER:$USER /opt/$NAME

# Tell Docker we are going to use this ports
EXPOSE 4200
USER $USER

ENTRYPOINT ["./entrypoint.sh"]
