# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  config.vm.define "server" do |server|
      server.vm.box = "ubuntu/trusty64"
      server.vm.network "private_network", ip: "192.168.50.101"
      server.vm.network "forwarded_port", guest: 8080, host: 8080

      server.vm.provision "server", type: "shell" do |s|
        # s.inline = "sudo docker pull rancher/server"
        s.inline = "sudo docker run -d --restart=always -p 8080:8080 rancher/server"
      end

  end

  config.vm.define "agent01" do |agent01|
    agent01.vm.box = "ubuntu/trusty64"
    agent01.vm.network "private_network", ip: "192.168.50.102"

    agent01.vm.provision "agent", type: "shell" do |s|
      s.inline = "sudo docker pull rancher/agent"
    end
  end

  config.vm.define "agent02" do |agent02|
    agent02.vm.network "private_network", ip: "192.168.50.103"
    agent02.vm.box = "ubuntu/trusty64"

    agent02.vm.provision "agent", type: "shell" do |s|
      s.inline = "sudo docker pull rancher/agent"
    end
  end

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    # vb.gui = true
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install apt-transport-https ca-certificates -y
    sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
    sudo echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' > /etc/apt/sources.list.d/docker.list
    sudo apt-get update
    sudo apt-get purge lxc-docker
    sudo apt-get install docker-engine -y
    echo "DOCKER_OPTS=\"\$DOCKER_OPTS --registry-mirror=http://9deed39a.m.daocloud.io\"" | sudo tee -a /etc/default/docker
    sudo service docker restart
  SHELL

end
