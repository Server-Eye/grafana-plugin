import React, { PureComponent, ChangeEvent } from 'react';

import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps, SelectableValue } from '@grafana/data';
import { ServerEyeDataSourceOptions, ServerEyeSecureJsonData } from './types';

const { SecretFormField, Select } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<ServerEyeDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  onBackendServerVersionChange = (event: SelectableValue<string>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        backendServerVersion: event.value!,
      },
    });
  };

  render() {
    const { options } = this.props;
    const { secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as ServerEyeSecureJsonData;

    const SERVER_VERSION_OPTIONS = [
      {
        label: 'Beta',
        value: 'BETA',
        description: 'Use the beta-version of the server-eye API. New changes are published here first. UNSTABLE',
      },
      {
        label: 'Production',
        value: 'PRODUCTION',
        description: 'Use the production-version of the server-eye API. STABLE',
      },
    ];

    const selectedServerVersion = SERVER_VERSION_OPTIONS.find((val) => {
      return val.value === options.jsonData.backendServerVersion;
    });

    return (
      <div className="gf-form-group">
        <div className="gf-form-inline">
          <div className="gf-form">
            <label className="gf-form-label width-6">Api Version</label>
            <Select
              className="gf-form-select width-8"
              value={selectedServerVersion}
              placeholder={'Select API Version'}
              options={SERVER_VERSION_OPTIONS}
              onChange={this.onBackendServerVersionChange}
            ></Select>
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
              value={secureJsonData.apiKey}
              label="API Key"
              placeholder="Your API key from Server-Eye"
              labelWidth={6}
              inputWidth={24}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
