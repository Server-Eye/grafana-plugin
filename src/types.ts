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
  backendServerURL: 'localhost',
  backendServerPort: 8080,
};

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface ServerEyeSecureJsonData {
  apiKey?: string;
}
