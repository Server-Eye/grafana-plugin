#!/bin/bash
grafanaPluginVersions=($(curl --silent 'https://api.github.com/repos/Server-Eye/grafana-plugin/tags' | grep '"name": *' | sed -e 's/    "name": "//' | sed -e 's/",//' | sed ':a;N;$!ba;s/\n/ /g'))
select version in "${grafanaPluginVersions[@]}" 
do
echo "Downloading $version of the Server-Eye Grafana plugin into this directory ($PWD)"
curl -sL "https://api.github.com/repos/Server-Eye/grafana-plugin/tarball/$version" --silent --output server-eye-data-source.tar.gz
tar -xzf server-eye-data-source.tar.gz
mv Server-Eye-grafana-plugin-*/dist ./server-eye-data-source-$version
rm -rf Server-Eye-grafana-plugin-* server-eye-data-source.tar.gz
break
done