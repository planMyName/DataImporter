import { PanelProps } from '@blueprintjs/core'

export interface MapFieldsPanelInfo {}

export const MapFieldsPanel: React.FC<PanelProps<MapFieldsPanelInfo>> = props => {

  const onFileSelectionChange = () => {
    console.log('File input changed');
    // enable next page button
  }
  
  return (
    <div className="map-fields">
      Map Fields data here
    </div>
  );
}

