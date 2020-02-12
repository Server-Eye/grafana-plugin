import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, MutableDataFrame } from '@grafana/data';

import { ServerEyeQuery, ServerEyeDataSourceOptions, Target, ValuesResult } from './types';

export class DataSource extends DataSourceApi<ServerEyeQuery, ServerEyeDataSourceOptions> {
  backendServerURL: string;
  backendServerPort: number;

  /** @ngInject */
  constructor(instanceSettings: DataSourceInstanceSettings<ServerEyeDataSourceOptions>, private backendSrv: any) {
    super(instanceSettings);
    this.backendServerPort = instanceSettings.jsonData.backendServerPort || 80;
    this.backendServerURL = instanceSettings.url || 'https://grafana-backend.server-eye.de';
    this.backendSrv = backendSrv;
  }

  async query(options: DataQueryRequest<ServerEyeQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();
    const data = await Promise.all(
      options.targets.map(target => {
        const query = target;
        if (query.hide) {
          return new MutableDataFrame();
        } else {
          return this.doQuery(target.agentid, target.selectedAgentTarget.value || '', from, to).then(result => {
            console.log(result);
            if (!result.values) {
              return new MutableDataFrame();
            }
            let times: any[] = [];
            let values: any[] = [];
            result.values.forEach(value => {
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

  async doQuery(agentId: string, saveName: string, from: number, to: number): Promise<ValuesResult> {
    return this.backendSrv
      .datasourceRequest({
        url: `${this.backendServerURL}/values/1/agent/${agentId}/${from}/${to}/${saveName}`,
      })
      .then((value: any) => {
        return value.data;
      });
  }

  async retrieveTargetsForAgent(agendtId: string): Promise<Target[]> {
    return this.backendSrv
      .datasourceRequest({
        url: this.backendServerURL + `/targets/1/agent/${agendtId}/targets`,
        method: 'GET',
      })
      .then((value: any) => {
        return value.data;
      })
      .catch((err: Error) => {
        return err;
      });
  }

  async testDatasource() {
    // Implement a health check for your data source.

    return {
      status: 'success',
      message: 'Success',
    };
  }
}
