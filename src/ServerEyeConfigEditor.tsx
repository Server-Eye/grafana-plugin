import React, { PureComponent, ChangeEvent } from 'react';

import { SecretFormField, FormField } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ServerEyeDataSourceOptions, ServerEyeSecureJsonData } from './types';

interface Props extends DataSourcePluginOptionsEditorProps<ServerEyeDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.options.jsonData.backendServerURL = 'localhost';
    this.props.options.jsonData.backendServerPort = 8080;
  }

  // onAgentIDChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { onOptionsChange, options } = this.props;
  //   const jsonData = {
  //     ...options.jsonData,
  //     agentid: event.target.value,
  //   };
  //   onOptionsChange({ ...options, jsonData });
  // };

  onBackendURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      backendServerURL: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onBackendPortChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      backendServerPort: parseInt(event.target.value, 10),
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to th ebackend)
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

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as ServerEyeSecureJsonData;

    return (
      <div className="gf-form-group">
        {/* <div className="gf-form">
          <FormField
            label="AgendID"
            labelWidth={6}
            inputWidth={20}
            onChange={this.onAgentIDChange}
            value={jsonData.agentid || ''}
            placeholder="json field returned to frontend"
          />
        </div> */}

        <div className="gf-form">
          <FormField
            label="Backend URL"
            labelWidth={8}
            inputWidth={20}
            onChange={this.onBackendURLChange}
            value={jsonData.backendServerURL || 'localhost'}
            placeholder="json field returned to frontend"
          />
        </div>

        <div className="gf-form">
          <FormField
            label="Backend Port"
            labelWidth={8}
            inputWidth={6}
            onChange={this.onBackendPortChange}
            value={jsonData.backendServerPort || 8080}
            placeholder="json field returned to frontend"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
              value={secureJsonData.apiKey || ''}
              label="API Key"
              placeholder="secure json field (backend only)"
              labelWidth={6}
              inputWidth={20}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
