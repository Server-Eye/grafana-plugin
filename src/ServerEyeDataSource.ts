import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, MutableDataFrame } from '@grafana/data';

import { ServerEyeQuery, ServerEyeDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<ServerEyeQuery, ServerEyeDataSourceOptions> {
  backendServerURL: string;
  backendServerPort: number;

  constructor(instanceSettings: DataSourceInstanceSettings<ServerEyeDataSourceOptions>) {
    super(instanceSettings);
    this.backendServerPort = instanceSettings.jsonData.backendServerPort;
    this.backendServerURL = instanceSettings.jsonData.backendServerURL;
  }

  async query(options: DataQueryRequest<ServerEyeQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();

    // Return a constant for each query.
    const data = await Promise.all(
      options.targets.map(target => {
        const query = target;
        if (query.hide) {
          return new MutableDataFrame();
        } else {
          return fetch(`http://${this.backendServerURL}:${this.backendServerPort}/${from}/${to}/${query.agentid}/${query.selectedAgentTarget.value}`)
            .then((value: any) => {
              return value.json();
            })
            .then((json: any) => {
              if (!json.values) {
                return new MutableDataFrame();
              }
              const times: any[] = [];
              const values: any[] = [];
              json.values.forEach((value: any) => {
                times.push(value.msDate);
                values.push(value.value);
              });
              const fields: any[] = [
                { type: 'time', values: times },
                { name: query.selectedAgentTarget.value, type: 'number', values: values },
              ];
              return new MutableDataFrame({ refId: query.refId, fields });
            });
        }
      })
    );

    return { data };
  }

  async testDatasource() {
    // Implement a health check for your data source.

    return {
      status: 'success',
      message: 'Success',
    };
  }
}
