import { PanelStack2, Panel } from "@blueprintjs/core";
import React from "react";
import { EditDataPanelInfo } from "../editdata";
import { MapFieldsPanelInfo } from "../mapfields";
import { SelectInputPanel, SelectInputPanelInfo } from "../selectinput";

import "./style.scss";

export type DataPanels = SelectInputPanelInfo | MapFieldsPanelInfo | EditDataPanelInfo

const initialPanel: Panel<SelectInputPanelInfo> = {
  props: {
  },
  renderPanel: SelectInputPanel,
  title: "Select Input"
};

export interface HomeProps {}

export const Home: React.FC<HomeProps> = props => {

  const [currentPanelStack, setCurrentPanelStack] = React.useState<Array<Panel<DataPanels>>>([initialPanel]);

  const addToPanelStack = React.useCallback(
    (newPanel: Panel<DataPanels>) => setCurrentPanelStack(stack => [...stack, newPanel]),
    [],
  );

  const removeFromPanelStack = React.useCallback(() => setCurrentPanelStack(stack => stack.slice(0, -1)), []);

  return (
    <div className="home">
      <p>helloworld!!!</p>
          <PanelStack2
              className="panel-stack"
              onOpen={addToPanelStack}
              onClose={removeFromPanelStack}
              renderActivePanelOnly={true}
              showPanelHeader={true}
              stack={currentPanelStack}
          />
    </div>
  );

}
