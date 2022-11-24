import { PanelProps } from '@blueprintjs/core'

export interface EditDataPanelInfo {}

export const EditDataPanel: React.FC<PanelProps<EditDataPanelInfo>> = props => {

  return (
    <div className="edit-data">
      Table grid here
    </div>
  );
}

