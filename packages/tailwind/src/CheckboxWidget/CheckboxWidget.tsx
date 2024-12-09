import { FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  schemaRequiresTrueValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

/** The `CheckboxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  schema,
  id,
  value,
  disabled,
  readonly,
  label = '',
  hideLabel,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  registry,
  options,
  uiSchema,
}: WidgetProps<T, S, F>) {
  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    options
  );

  // Check if the schema requires the value to be "true" (for required validation)
  const required = schemaRequiresTrueValue<S>(schema);

  // Handle the change of the checkbox value
  const _onChange = (_: any, checked: boolean) => onChange(checked);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onFocus(id, value);

  // Get the description for the checkbox
  const description = options.description ?? schema.description;

  return (
    <>
      {/* Description */}
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}

      {/* Checkbox with Label */}
      <div className='flex items-center space-x-2 mt-2'>
        <input
          type='checkbox'
          id={id}
          name={id}
          checked={typeof value === 'undefined' ? false : Boolean(value)}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={(e) => _onChange(e, e.target.checked)}
          onBlur={_onBlur}
          onFocus={_onFocus}
          aria-describedby={ariaDescribedByIds<T>(id)}
          className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
        />
        <label htmlFor={id} className={`text-sm ${required ? 'text-red-600' : 'text-gray-700'}`}>
          {labelValue(label, hideLabel, false)}
        </label>
      </div>
    </>
  );
}
