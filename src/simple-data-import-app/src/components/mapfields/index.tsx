import { Button, PanelProps, Intent, Position, MenuItem } from '@blueprintjs/core'
import { ItemPredicate, ItemRenderer, Select2 } from '@blueprintjs/select';
import React, { useEffect } from 'react';
import { ImportSchemaModel, ProcessInputFileForSchems, SchemaHeader } from '../../api/schema/schemaApi';
import { DataMigrationDetails } from '../../models/DataMigrationDetails';
import { EditDataPanel } from '../editdata';

import './style.scss';

export interface MapFieldsPanelInfo {
  migrationDetails?: DataMigrationDetails
}

export interface InputToSchemaMap {
  inputHeader: SchemaHeader,
  schemaHeader: SchemaHeader
  index: number
}

const filterHeader: ItemPredicate<SchemaHeader> = (query, header, _index, exactMatch) => {
  const normalizedTitle = header.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
      return normalizedTitle === normalizedQuery;
  } else {
      return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
}

const renderHeader: ItemRenderer<SchemaHeader> = (header: SchemaHeader, { handleClick, handleFocus, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
      return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={header.name}
      label={header.name}
      onClick={handleClick}
      onFocus={handleFocus}
      text={`${header.name}:${header.type}`}
    />
  )
}

export const MapFieldsPanel: React.FC<PanelProps<MapFieldsPanelInfo>> = props => {

  const [schemaModel, setSchemaModel] = React.useState<ImportSchemaModel>()
  const [isNextPageAllowed, setIsNextPageAllowed] = React.useState<boolean>(true)
  const [inputToSchemaMaps, setInputToSchemaMaps] = React.useState<InputToSchemaMap[]>([])

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

  const setSelectInputHeader = (header: SchemaHeader, index: number) => {
    const newInputToSchemaMaps = [...inputToSchemaMaps]
    const existingInputToSchemaMap = newInputToSchemaMaps.find(x => x.index === index)
    if (!existingInputToSchemaMap) {
      newInputToSchemaMaps.push({
        inputHeader: header,
        schemaHeader: schemaModel?.schemaHeaders?.[index] || { name: '', type: '', required: false },
        index: index
      })
    } else {
      existingInputToSchemaMap.inputHeader = header
    }
    
    setInputToSchemaMaps(newInputToSchemaMaps)
  }

  const getSelectedInputHeader = (index: number) => {
    if (index < 0) {
      return undefined
    }

    const inputToSchemaMap = inputToSchemaMaps.find(x => x.index === index)
    if (!inputToSchemaMap) {
      return undefined
    }
    return `${inputToSchemaMap?.inputHeader.name}:${inputToSchemaMap?.inputHeader.type}` ?? ''
  }

  const renderDropdown = (inputHeaders: SchemaHeader[] | undefined, index:number): React.ReactNode => {
    return (
      <Select2<SchemaHeader>
        items={inputHeaders ?? []}
        itemPredicate={filterHeader}
        itemRenderer={renderHeader}
        onItemSelect={(item) => {setSelectInputHeader(item, index)}}
      >
        <Button
          text={getSelectedInputHeader(index) ?? "Select input column to map"}
          rightIcon="double-caret-vertical"
          placeholder="select input column to map"
        />
      </Select2>
    )
  }

  useEffect(() => {
    ProcessInputFileForSchems(props.migrationDetails).then((schema) => {setSchemaModel(schema)});
  }, [props.migrationDetails])

  if (!schemaModel) {
    return <div>Loading ... </div>;
  }

  return (
    <div className="map-fields">
      <p>
        Map the fields of the input file to data field of in Smokeball system.
      </p>
      <div className="field-mappings">
        <table className="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Input File Column</th>
              <th>Smokeball Data Field</th>
              <th>IsRequired</th>
            </tr>
          </thead>
          <tbody>
          {
            schemaModel.schemaHeaders?.map((header, index) => {
              return (
                  <tr>
                    <td>{renderDropdown(schemaModel.inputHeaders, index)}</td>
                    <td><b>{header.name}</b>:{header.type}</td>
                    <td>{header.required ? 'Yes' : 'No'}</td>
                  </tr>
              )
            })
          }
          </tbody>
        </table>
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
