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
  backendServerURL: string;
  backendServerPort: number;
}

export const defaultOptions: Partial<ServerEyeDataSourceOptions> = {
  backendServerURL: 'grafana-plugin.server-eye.de',
  backendServerPort: 80,
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

export interface TimeSeries {
  values: Measurement[];
  from: number;
  to: number;
}

interface Measurement {
  unit: number;
  value: number;
  maxValue: number;
  minValue: number;
  maxPValue: number;
  msDate: number;
}