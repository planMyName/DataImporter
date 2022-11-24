import { PanelProps, FileInput } from '@blueprintjs/core'

export interface SelectInputPanelInfo {}

export const SelectInputPanel: React.FC<PanelProps<SelectInputPanelInfo>> = props => {

  const onFileSelectionChange = () => {
    console.log('File input changed');
    // enable next page button
  }
  
  return (
    <div className="select-input">
      <FileInput 
        disabled={true} 
        text="Choose migration input file..." 
        onInputChange={() => onFileSelectionChange()} />
    </div>
  );
}

