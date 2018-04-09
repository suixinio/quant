# Quant

## Brief

1. Quants trader tool for bitcoin
2. Rebuild from samaritan

## Support

- bitcoin
- talib algorithm

### OS Environment

- centos7
- need 2GB of ram to run docker.

### Docker Install
- Uninstall old Docker Version 
    ```bash
    $ sudo yum remove docker \
      docker-client \
      docker-client-latest \
      docker-common \
      docker-latest \
      docker-latest-logrotate \
      docker-logrotate \
      docker-selinux \
      docker-engine-selinux \
      docker-engine
    ```
- Repo install and upgrade
    ```bash 
    sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
    ```
    ```bash
    sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
    ```
    ```bash
    $ sudo yum install docker-ce
    ```
    ```bash
    $ sudo systemctl start docker
    ```
    [install docker-compose](https://github.com/docker/compose/releases)

### Build

```bash
docker build -t xiyanxiyan10/samaritan ./
```

### Run

```bash
cd ./deploy/compose && docker-compose up -d
```

## File

1. deploy deploy project 
2. docker source for docker images build  
3. docs   hangbook
4. src    background source code
5. vendor golang gb support 
6. web    front source code
7. tools  base policy for quant

## Todo

1. fix exchange api

## Fork

- [samaritan - miaolz123](https://github.com/miaolz123/samaritan)
- [quant - xiyanxiyan10](https://github.com/xiyanxiyan10/quant)
