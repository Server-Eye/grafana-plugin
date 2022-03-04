import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';

import { getBackendSrv } from '@grafana/runtime';

import { ServerEyeQuery, ServerEyeDataSourceOptions, Target, Measurement } from './types';

export class DataSource extends DataSourceApi<ServerEyeQuery, ServerEyeDataSourceOptions> {
  backendServerURL: string;
  proxyPath: string;

  /** @ngInject */
  constructor(instanceSettings: DataSourceInstanceSettings<ServerEyeDataSourceOptions>) {
    super(instanceSettings);
    switch (instanceSettings.jsonData.backendServerVersion) {
      case 'BETA':
        this.proxyPath = 'grafana-plugin-beta';
        break;

      default:
        this.proxyPath = 'grafana-plugin';
        break;
    }

    this.backendServerURL = instanceSettings.url || 'https://api-ms.server-eye.de/3/grafana-plugin';
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
          return this.doQuery(target.agentid, target.selectedAgentTarget.value || '', from, to).then((result) => {
            if (!result || !result.length) {
              return new MutableDataFrame();
            }
            const times: number[] = [];
            const values: number[] = [];
            result.forEach((value) => {
              if (value) {
                times.push(value.msDate);
                values.push(value.value);
              }
            });
            const fields: any[] = [
              { type: 'time', values: times },
              { name: query.selectedAgentTarget.value, type: 'number', values: values },
            ];
            return new MutableDataFrame({ name: target.selectedAgentTarget.value, refId: query.refId, fields });
          });
        }
      })
    );
    return { data };
  }

  async doQuery(agentId: string, saveName: string, from: number, to: number): Promise<Array<Measurement | null>> {
    const url = `${this.backendServerURL}/${this.proxyPath}/${agentId}/${saveName}/${from}/${to}`;
    return getBackendSrv()
      .datasourceRequest({
        url,
      })
      .then((value: any) => {
        console.log(value);
        return value.data;
      })
      .catch((error: Error) => {
        return error;
      });
  }

  async retrieveTargetsForAgent(agentId: string): Promise<Target[]> {
    const url = `${this.backendServerURL}/${this.proxyPath}/${agentId}/targets`;
    return getBackendSrv()
      .datasourceRequest({
        url,
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
