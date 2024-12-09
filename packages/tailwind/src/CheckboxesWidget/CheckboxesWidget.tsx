import { ChangeEvent, FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsValueForIndex,
  labelValue,
  optionId,
  FormContextType,
  WidgetProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  label,
  hideLabel,
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        onChange(enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions));
      } else {
        onChange(enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions));
      }
    };

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  return (
    <>
      {/* Label Section */}
      {labelValue(
        <label htmlFor={id} className={`block text-sm font-medium ${required ? 'text-red-600' : 'text-gray-700'}`}>
          {label || undefined}
        </label>,
        hideLabel
      )}

      {/* Checkbox Group */}
      <div id={id} className={`mt-2 ${inline ? 'flex space-x-4' : 'space-y-2'}`}>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const checked = enumOptionsIsSelected<S>(option.value, checkboxesValues);
            const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;

            return (
              <div key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  id={optionId(id, index)}
                  name={id}
                  checked={checked}
                  disabled={disabled || itemDisabled || readonly}
                  autoFocus={autofocus && index === 0}
                  onChange={_onChange(index)}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                  aria-describedby={ariaDescribedByIds<T>(id)}
                  className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
                />
                <label htmlFor={optionId(id, index)} className='ml-2 text-sm text-gray-700'>
                  {option.label}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
}
