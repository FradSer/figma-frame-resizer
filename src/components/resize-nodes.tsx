import {
  Button,
  Checkbox,
  Columns,
  Container,
  mapTextboxNumericValueToString,
  MIXED_NUMBER,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace,
  IconLayerFrame16
} from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import {
  CloseUIHandler,
  Dimensions,
  FormState,
  SelectionChangedHandler,
  ResizeNodesProps,
  SubmitHandler
} from '../utilities/types.js';

export function ResizeNodes(props: ResizeNodesProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI');
      },
      submit: function ({
        resizeEdgeSize,
        width,
        height,
        resizeWithConstraints
      }: FormState) {
        emit<SubmitHandler>('SUBMIT', {
          resizeEdgeSize,
          height,
          resizeWithConstraints,
          width
        });
      },
      validate: function ({ width, height }: FormState) {
        return (
          (width !== null && width !== MIXED_NUMBER && width !== 0) ||
          (height !== null && height !== MIXED_NUMBER && height !== 0)
        );
      }
    });

  const [resizeEdgeSizeString, setResizeEdgeSize] = useState(
    mapTextboxNumericValueToString(formState.resizeEdgeSize)
  );
  const [widthString, setWidthString] = useState(
    mapTextboxNumericValueToString(formState.width)
  );
  const [heightString, setHeightString] = useState(
    mapTextboxNumericValueToString(formState.height)
  );

  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function ({ width, height }: Dimensions) {
          setWidthString(mapTextboxNumericValueToString(width));
          setHeightString(mapTextboxNumericValueToString(height));
        }
      );
    },
    [setWidthString, setHeightString]
  );
  const { resizeEdgeSize, width, height } = formState;
  const hasSelection = width !== null && height !== null;
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>Edge size increase by:</Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        {...initialFocus}
        disabled={hasSelection === false}
        icon={<IconLayerFrame16 />}
        minimum={0}
        name="resizeEdgeSize"
        onNumericValueInput={setFormState}
        onValueInput={setResizeEdgeSize}
        value={resizeEdgeSizeString}
      />
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Resize Layer Size
      </Button>
      <VerticalSpace space="small" />
    </Container>
  );
}
