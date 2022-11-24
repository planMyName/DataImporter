import { Button, PanelProps, Intent } from '@blueprintjs/core'
import React from 'react';
import { useAsync } from 'react-use';
import { ImportSchemaModel, ProcessInputFileForSchems } from '../../api/schema/schemaApi';
import { DataMigrationDetails } from '../../models/DataMigrationDetails';
import { EditDataPanel } from '../editdata';

import './style.scss';

export interface MapFieldsPanelInfo {
  migrationDetails?: DataMigrationDetails
}

export const MapFieldsPanel: React.FC<PanelProps<MapFieldsPanelInfo>> = props => {

  const [schemaModel, setSchemaModel] = React.useState<ImportSchemaModel>()
  const [isNextPageAllowed, setIsNextPageAllowed] = React.useState<boolean>(true)

  const importSchemaModel = useAsync(ProcessInputFileForSchems, [props.migrationDetails])

  const onNextPageClick = React.useCallback(() => {
    if (props.migrationDetails !== undefined) {
      // api call to get all schema detail to pass to next panel
      props.openPanel({
        props: {
          migrationDetails: props.migrationDetails
        },
        renderPanel: EditDataPanel,
        title: "Step 3: Inspect & Edit Data"
      })
    }
  }, [props])

  if (importSchemaModel.loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="map-fields">
      <p>
        Map the fields of the input file to data field of in Smokeball system.
      </p>
      <div className="field-mappings">
        <div className="field-mapping">
          {
            schemaModel?.inputHeaders?.map((schema, index) => (<span>{schema.name}</span>))
          }
        </div>
        <div className="field-mapping">
          {
            schemaModel?.schemaHeaders?.map((schema, index) => (<span>{schema.name}</span>))
          }
        </div>
      </div>
      <Button
        disabled={!isNextPageAllowed}
        onClick={onNextPageClick}
        text="Next: Edit Data"
        rightIcon="arrow-right"
        intent={Intent.PRIMARY}
      />
    </div>
  );
}

