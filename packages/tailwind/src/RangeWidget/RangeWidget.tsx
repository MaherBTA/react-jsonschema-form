import { FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  rangeSpec,
} from '@rjsf/utils';

/** The `RangeWidget` component uses a slider with Tailwind CSS styling. */
export default function RangeWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: WidgetProps<T, S, F>
) {
  const { value, readonly, disabled, onBlur, onFocus, options, schema, onChange, required, label, hideLabel, id } =
    props;
  const sliderProps = { value, id, name: id, ...rangeSpec<S>(schema) };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value) || options.emptyValue);
  };

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onFocus(id, value);

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
      <div className='flex items-center space-x-4 mt-2'>
        <input
          type='range'
          id={id}
          value={value || 0}
          min={sliderProps.min || 0}
          max={sliderProps.max || 100}
          step={sliderProps.step || 1}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          disabled={disabled || readonly}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled || readonly ? 'cursor-not-allowed opacity-50' : ''
          }`}
          aria-describedby={ariaDescribedByIds<T>(id)}
        />
        <span className='text-sm text-gray-700'>{value || 0}</span>
      </div>
    </div>
  );
}
