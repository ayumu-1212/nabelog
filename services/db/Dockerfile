# 認証周りでエラーが起こったので、versionを5.7に
# TODO: いつかmysql:8.0に
FROM mysql:5.7-debian

RUN apt-get update
RUN apt-get -y install locales-all

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8

COPY my.cnf /etc/mysql/my.cnf