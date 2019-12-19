import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './ServerEyeDataSource';
import { ConfigEditor } from './ServerEyeConfigEditor';
import { QueryEditor } from './ServerEyeQueryEditor';
import { ServerEyeQuery, ServerEyeDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, ServerEyeQuery, ServerEyeDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
