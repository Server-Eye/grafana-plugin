import { DataQuery, DataSourceJsonData, SelectableValue } from '@grafana/data';

export interface ServerEyeQuery extends DataQuery {
  agentid: string;
  interval: string;
  possibleAgentTargets: Array<SelectableValue<string>>;
  selectedAgentTarget: SelectableValue<string>;
}

/**
 * These are options configured for each DataSource instance
 */
export interface ServerEyeDataSourceOptions extends DataSourceJsonData {
  backendServerVersion: string;
}

export const defaultOptions: Partial<ServerEyeDataSourceOptions> = {
  backendServerVersion: 'PRODUCTION',
};

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface ServerEyeSecureJsonData {
  apiKey: string;
}

export interface Target {
  saveName: string;
  name: string;
}

export interface Measurement {
  value: number;
  msDate: number;
}
