import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';

import { ServerEyeQuery, ServerEyeDataSourceOptions, Target, TimeSeries } from './types';

export class DataSource extends DataSourceApi<ServerEyeQuery, ServerEyeDataSourceOptions> {
  backendServerURL: string;
  backendServerPort: number;

  /** @ngInject */
  constructor(instanceSettings: DataSourceInstanceSettings<ServerEyeDataSourceOptions>, private backendSrv: any) {
    super(instanceSettings);
    this.backendServerPort = instanceSettings.jsonData.backendServerPort || 80;
    this.backendServerURL = instanceSettings.url || 'https://api-ms.server-eye.de/grafana-plugin';
    this.backendSrv = backendSrv;
  }

  async query(options: DataQueryRequest<ServerEyeQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range?.from.valueOf() || 0;
    const to = range?.to.valueOf() || 0;
    const data = await Promise.all(
      options.targets.map((target) => {
        const query = target;
        if (query.hide) {
          return new MutableDataFrame();
        } else {
          return this.doQuery(target.agentid, target.selectedAgentTarget.value || '', from, to).then(
            (result: TimeSeries) => {
              if (!result.values) {
                return new MutableDataFrame();
              }
              const times: number[] = [];
              const values: number[] = [];
              result.values.forEach((value) => {
                times.push(value.msDate);
                values.push(value.value);
              });
              const fields: any[] = [
                { type: 'time', values: times },
                { name: query.selectedAgentTarget.value, type: 'number', values: values },
              ];
              return new MutableDataFrame({ name: target.selectedAgentTarget.value, refId: query.refId, fields });
            }
          );
        }
      })
    );
    return { data };
  }

  async doQuery(agentId: string, saveName: string, from: number, to: number): Promise<TimeSeries> {
    return this.backendSrv
      .datasourceRequest({
        url: `${this.backendServerURL}/${agentId}/${saveName}/${from}/${to}`,
      })
      .then((value: any) => {
        return value.data;
      })
      .catch((error: Error) => {
        return error;
      });
  }

  async retrieveTargetsForAgent(agendtId: string): Promise<Target[]> {
    return this.backendSrv
      .datasourceRequest({
        url: this.backendServerURL + `/${agendtId}/targets`,
        method: 'GET',
      })
      .then((value: any) => {
        return value.data;
      })
      .catch((error: Error) => {
        return error;
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
