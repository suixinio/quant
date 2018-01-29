############################################
# version : xiyanxiyan10/samaritan
############################################

# 设置继承自centos官方镜像
FROM centos

# 下面是一些创建者的基本信息
MAINTAINER xiyanxiyan10 (xiyanxiyan10@hotmail.com)

# set env
ENV LC_ALL C

# 设置环境变量，所有操作都是非交互式的
ENV DEBIAN_FRONTEND noninteractive

#install pkg
RUN yum install -y git gcc wget golang sqlite autoconf automake libtool make

#mkdir
RUN mkdir /opt/app -p
RUN mkdir /opt/gb -p 
RUN mkdir /opt/depend -p 

# add pkg
WORKDIR /opt/depend 
RUN wget http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz
RUN wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.xz
RUN tar xvf ta-lib-0.4.0-src.tar.gz
RUN tar xvf node-v8.9.3-linux-x64.tar.xz

#build ta lib
RUN cd /opt/depend/ta-lib && ./configure --prefix=/usr LDFLAGS="-lm" && make && make install

#add file
COPY ./web /opt/app/web
COPY ./src /opt/app/src
COPY ./vendor /opt/app/vendor
COPY ./docker/config /opt/app/config

#build go depended
ENV GOPATH /opt/gb
ENV PATH    $PATH:/opt/depend/node-v8.9.3-linux-x64/bin/:/opt/gb/bin
ENV QUANT_CONFIG /opt/app/config/config.ini
RUN go get github.com/constabulary/gb/... 

RUN ls /opt/gb && ls /opt/depend && ls /opt/app
RUN env

RUN cd /opt/app && gb vendor restore && mkdir vendor/src/golang.org/x -p && cd vendor/src/golang.org/x && git clone https://github.com/golang/text && git clone https://github.com/golang/tools && git clone https://github.com/golang/net 

#build web depended
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install cooking -g && cnpm install cooking-cli -g && cd /opt/app/web && cnpm install 


#build project
RUN cd /opt/app && gb build && cd /opt/app/web && cooking build 
#追加链接库
RUN echo "/usr/local/lib" >> /etc/ld.so.conf && ldconfig

#VOLUME 选项是将本地的目录挂在到容器中　此处要注意：当你运行-v　＜hostdir>:<Containerdir> 时要确保目录内容相同否则会出现数据丢失
## 对应关系如下
VOLUME ["/data"]

EXPOSE 9876

WORKDIR /opt/app

CMD ["./bin/samaritan"]
