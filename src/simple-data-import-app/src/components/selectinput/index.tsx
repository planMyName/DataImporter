import { PanelProps, FileInput, Label, RadioGroup, Radio, Button, Intent } from '@blueprintjs/core'
import React from 'react'
import { DataMigrationDetails } from '../../models/DataMigrationDetails'
import { v4 as uuidv4 } from 'uuid'

import './style.scss'
import { MapFieldsPanel } from '../mapfields'

export interface SelectInputPanelInfo {
  migrationDetails?: DataMigrationDetails
}

export const SelectInputPanel: React.FC<PanelProps<SelectInputPanelInfo>> = props => {

  const [selectedImportType, setSelectedImportType] = React.useState<string>("staffs")
  const [isNextPageAllowed, setIsNextPageAllowed] = React.useState<boolean>(false)
  const defaultFileName: string = "Choose migration input file..."
  const [selectedFileName, setSelectedFileName] = React.useState<string>(defaultFileName)
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>()
  
  const onImportTypeChange = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setSelectedImportType(event.currentTarget.value)
  }, [])

  const onFileSelectionChange = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setSelectedFileName(event.currentTarget.value.split("\\").pop() ?? defaultFileName)
    setSelectedFile(event.currentTarget.files?.[0])
    setIsNextPageAllowed(event.currentTarget.value !== "")
  }, [])

  const onNextPageClick = React.useCallback(() => {
    if (selectedFile !== undefined) {
      // api call to get all schema detail to pass to next panel
      const fileId = `file-${selectedImportType}-${uuidv4()}`
      props.openPanel({
        props: {
          migrationDetails: {
            id: fileId,
            type: selectedImportType,
            fileName: selectedFile.name,
            file: selectedFile
          }
        },
        renderPanel: MapFieldsPanel,
        title: "Step 2: Map Fields"
      })
    }
  }, [selectedFile, selectedImportType, props])
  
  return (
    <div className="select-input">
      <p>
        Select the type of data you want to import. It can be a csv or xlsx file.
      </p>
      <RadioGroup
          label="Type of Migration:"
          onChange={onImportTypeChange}
          selectedValue={selectedImportType}
      >
          <Radio label="Staffs" value="staffs" />
          <Radio label="Contacts" value="contacts" />
          <Radio label="Matters" value="matters" />
      </RadioGroup>

      <Label>Select Input File:
        <FileInput 
          className='file-input'
          disabled={false} 
          text={selectedFileName} 
          onInputChange={onFileSelectionChange} />
      </Label>

      <Button 
        disabled={!isNextPageAllowed}
        text="Next: Map Fields"
        rightIcon="arrow-right"
        intent={Intent.PRIMARY}
        onClick={onNextPageClick}
      />
    </div>
  );
}

