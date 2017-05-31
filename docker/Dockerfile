############################################
# version : lancelot/tools:v1
# desc : 当前版本安装的ssh，wget，curl，supervisor 
############################################
# 设置继承自ubuntu官方镜像
FROM lancelot/tools:v1.0

# 下面是一些创建者的基本信息
MAINTAINER birdben (191654006@163.com)

# 设置环境变量，所有操作都是非交互式的
ENV DEBIAN_FRONTEND noninteractive

#install sqlite
RUN sudo apt-get install -y sqlite autoconf automake libtool make

# 添加 supervisord 的配置文件，并复制配置文件到对应目录下面。（supervisord.conf文件和Dockerfile文件在同一路径）
COPY store/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# add config.ini
COPY store/config/config.ini /tmp/config.ini

# add talib
COPY depend/ta-lib-0.4.0-src.tar.gz /tmp/ta-lib.tar.gz
COPY depend/build.sh /tmp/build.sh

#WORKDIR "/tmp/ta-lib"
#CMD ["sudo chmod 777 ./configure"]
#CMD ["./configure --prefix=/usr LDFLAGS=-lm"]
#CMD ["make"]
#CMD ["sudo make install"]

# set env
CMD ["export LC_ALL=C"]
#VOLUME 选项是将本地的目录挂在到容器中　此处要注意：当你运行-v　＜hostdir>:<Containerdir> 时要确保目录内容相同否则会出现数据丢失
## 对应关系如下
### samaritan:/docker/samaritan
VOLUME ["/samaritan"]

# samaritan 9876
EXPOSE 9876

# 执行supervisord来同时执行多个命令，使用 supervisord 的可执行路径启动服务。
CMD ["/usr/bin/supervisord"]
