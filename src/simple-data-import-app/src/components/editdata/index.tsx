import { PanelProps } from '@blueprintjs/core'
import { DataMigrationDetails } from '../../models/DataMigrationDetails';
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import './style.scss'

export interface EditDataPanelInfo {
  migrationDetails?: DataMigrationDetails
}

export const EditDataPanel: React.FC<PanelProps<EditDataPanelInfo>> = props => {


  return (
    <div className="edit-data">
      Table grid here
    </div>
  );
}

