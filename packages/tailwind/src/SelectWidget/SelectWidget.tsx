import { ChangeEvent, FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

/** The `SelectWidget` is a widget for rendering dropdowns. */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  schema,
  id,
  options,
  label,
  hideLabel,
  required,
  disabled,
  readonly,
  placeholder,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;

  multiple = typeof multiple === 'undefined' ? false : !!multiple;

  const emptyValue = multiple ? [] : '';
  const isEmpty = typeof value === 'undefined' || (multiple && value.length < 1) || (!multiple && value === emptyValue);

  const _onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  };

  const _onBlur = ({ target }: FocusEvent<HTMLSelectElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(target.value, enumOptions, optEmptyVal));

  const _onFocus = ({ target }: FocusEvent<HTMLSelectElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(target.value, enumOptions, optEmptyVal));

  const selectedIndexes = enumOptionsIndexForValue<S>(value, enumOptions, multiple);
  const showPlaceholderOption = !multiple && schema.default === undefined;

  return (
    <div className='mb-4'>
      {!hideLabel && label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${
            required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''
          }`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        multiple={multiple}
        value={!isEmpty && typeof selectedIndexes !== 'undefined' ? selectedIndexes : emptyValue}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
          rawErrors.length > 0 ? 'border-red-500' : ''
        }`}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        {showPlaceholderOption && <option value=''>{placeholder}</option>}
        {Array.isArray(enumOptions) &&
          enumOptions.map(({ value, label }, i: number) => {
            const isOptionDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
            return (
              <option key={i} value={String(i)} disabled={isOptionDisabled}>
                {label}
              </option>
            );
          })}
      </select>
      {rawErrors.length > 0 && (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {rawErrors[0]}
        </p>
      )}
    </div>
  );
}
