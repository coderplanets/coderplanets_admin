FROM node:8.11

RUN mkdir /root/admin_web

ADD web.tar.gz /root/admin_web
RUN cd /root/admin_web/ && npm install --registry=https://registry.npm.taobao.org

ADD loader.sh /usr/local/bin/loader.sh
RUN chmod +x /usr/local/bin/loader.sh
CMD ["/usr/local/bin/loader.sh"]