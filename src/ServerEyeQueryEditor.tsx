import React, { PureComponent, ChangeEvent } from 'react';
import { FormField, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './ServerEyeDataSource';
import { ServerEyeQuery, ServerEyeDataSourceOptions } from './types';

type Props = QueryEditorProps<DataSource, ServerEyeQuery, ServerEyeDataSourceOptions>;

interface State {}

//Regex to recognize valid agentIds
const agentIdRegex = /[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}/g;

export class QueryEditor extends PureComponent<Props, State> {
  async refreshPossibleAgentTargets(newAgentID?: string) {
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

  onAgentTargetChange = (item: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedAgentTarget: item });
  };

  onAgentIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, agentid: event.target.value });
    //Check if the new value from the event matches the agentId-regex
    if (event.target.value.match(agentIdRegex)) {
      //if it does, refresh the Targets for the SelectableValue field
      this.refreshPossibleAgentTargets(event.target.value);
    }
    //TODO: Would be handy if this could mark the FormField as invalid or similar in case it is not a valid agentId
  };

  render() {
    const query = this.props.query;
    const { agentid, possibleAgentTargets, selectedAgentTarget } = query;
    return (
      <div className="gf-form">
        <FormField width={100} value={agentid} onChange={this.onAgentIDChange} label="AgentID" type="string"></FormField>
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
