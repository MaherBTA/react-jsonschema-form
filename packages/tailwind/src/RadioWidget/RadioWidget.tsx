import { FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  labelValue,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

/** The `RadioWidget` is a widget for rendering a radio group with Tailwind CSS */
export default function RadioWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  hideLabel,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  const _onChange = (_: any, value: any) => onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  const row = options ? options.inline : false;
  const selectedIndex = enumOptionsIndexForValue<S>(value, enumOptions) ?? null;

  return (
    <div className='mb-4'>
      {labelValue(
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${
            required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''
          }`}
        >
          {label || undefined}
        </label>,
        hideLabel
      )}
      <div
        id={id}
        className={`flex ${row ? 'flex-row gap-4' : 'flex-col gap-2'} mt-2`}
        role='radiogroup'
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
            return (
              <label
                key={index}
                htmlFor={optionId(id, index)}
                className={`flex items-center space-x-2 ${
                  disabled || itemDisabled || readonly ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <input
                  type='radio'
                  id={optionId(id, index)}
                  name={id}
                  value={String(index)}
                  checked={selectedIndex === String(index) || (selectedIndex === null && index === 0)}
                  onChange={(_) => _onChange(_, String(index))}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                  disabled={disabled || itemDisabled || readonly}
                  className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                />
                <span className='text-sm text-gray-700'>{option.label}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
