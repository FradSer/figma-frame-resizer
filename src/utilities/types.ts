import { EventHandler } from '@create-figma-plugin/utilities';

export type Dimensions = {
  width: null | number;
  height: null | number;
};

export type Settings = {
  resizeEdgeSize: null | number;
  resizeWithConstraints: boolean;
};

export type ResizeNodesProps = Settings & Dimensions;
export type FormState = ResizeNodesProps;

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI';
  handler: () => void;
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT';
  handler: (props: FormState) => void;
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED';
  handler: (dimensions: Dimensions) => void;
}
