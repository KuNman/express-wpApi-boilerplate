FROM php:7.4-fpm-alpine

MAINTAINER bmf <bmf.infomation@gmail.com>

RUN apk upgrade --update \
  && apk add \
     libzip-dev \
     git \
     zlib-dev \
     nginx \
  && docker-php-ext-install pdo_mysql zip

RUN curl -sS https://getcomposer.org/installer | php

RUN mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html
