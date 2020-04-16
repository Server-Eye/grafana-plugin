# Server Eye Grafana data Source

This is a grafana data source plugin for your instance of [ServerEye Monitoring Software](https://server-eye.de).

It can display all the data from your sensors via access to our API with one of your API keys.

![Configuration page](https://raw.githubusercontent.com/Server-Eye/grafana-plugin/master/src/img/overview.png)

## Installation

In order to use this, you can either download the plugin straight from the GitHub releases page of the repository [here](https://github.com/server-eye/grafanaplugin/releases), unzipping into your Grafana Plugin directory.

Alternatively you can download it from the official Grafana plugin store [here](https://grafana.com/grafana/plugins), looking for ServerEye and following the instructions there.

## Configuration

All that is needed is an API key from your OCC. Just copy it into the API key field on the config page of your ServerEye datasource instance. This will give you access to all the agents that that API key is authorized with.

![Configuration page](https://raw.githubusercontent.com/Server-Eye/grafana-plugin/master/src/img/configpage.png)

## Requirements

This plugin requires a Grafana version greater or equal to 6.5 