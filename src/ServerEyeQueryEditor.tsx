import React, { PureComponent, ChangeEvent } from 'react';
import { FormField, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './ServerEyeDataSource';
import { ServerEyeQuery, ServerEyeDataSourceOptions } from './types';

type Props = QueryEditorProps<DataSource, ServerEyeQuery, ServerEyeDataSourceOptions>;

interface State {}

export class QueryEditor extends PureComponent<Props, State> {
  async refreshPossibleAgentTargets(newAgentID?: string) {
    // console.log(this.props.query.agentid)
    const target = () => {
      if (newAgentID) {
        return newAgentID;
      } else {
        return this.props.query.agentid;
      }
    };

    //Retrieve the targets for the new AgentID, and upon arrival map them into 'SelectableValue' fields for the UI
    this.props.datasource.retrieveTargetsForAgent(target()).then(targets => {
      const selectableTargets = targets.map(
        (target): SelectableValue<string> => {
          return { label: target.saveName, value: target.saveName, description: target.name };
        }
      );
      const { onChange, query } = this.props;
      onChange({ ...query, possibleAgentTargets: selectableTargets });
    });
  }

  async componentDidMount() {}

  onAgentTargetChange = (item: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedAgentTarget: item });
  };

  onAgentIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}/g)) {
      const { onChange, query } = this.props;
      onChange({ ...query, agentid: event.target.value });
      this.refreshPossibleAgentTargets(event.target.value);
    } else {
      const { onChange, query } = this.props;
      onChange({ ...query, agentid: event.target.value });
      console.log('not an agentid yet');
      //TODO Turn into proper error message
    }
  };

  render() {
    console.log('rendering');
    const query = this.props.query;

    const { agentid, possibleAgentTargets, selectedAgentTarget } = query;

    return (
      <div className="gf-form">
        <FormField width={4} value={agentid} onChange={this.onAgentIDChange} label="AgentID" type="string"></FormField>
        <Select
          value={selectedAgentTarget}
          placeholder={'Select Agent Target'}
          options={possibleAgentTargets}
          onChange={this.onAgentTargetChange}
        ></Select>
      </div>
    );
  }
}
