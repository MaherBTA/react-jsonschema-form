import { ChangeEvent, FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  getInputProps,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

const TYPES_THAT_SHRINK_LABEL = ['date', 'datetime-local', 'file', 'time'];

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    id,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    hideLabel,
    value,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    rawErrors = [],
  } = props;

  const inputPropsConfig = getInputProps<T, S, F>(schema, type, options);
  const { step, min, max, ...rest } = inputPropsConfig;

  const otherProps = {
    step,
    min,
    max,
    ...(schema.examples ? { list: examplesId<T>(id) } : undefined),
    ...rest,
  };

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(value === '' ? options.emptyValue : value);

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target && target.value);

  return (
    <div className='mb-4'>
      {/* Label Section */}
      {!hideLabel && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium ${required ? 'text-red-600' : 'text-gray-700'} ${
            TYPES_THAT_SHRINK_LABEL.includes(type) ? 'shrink' : ''
          }`}
        >
          {labelValue(label || '', hideLabel, false)}
        </label>
      )}

      {/* Input Field */}
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value || value === 0 ? value : ''}
        onChange={onChangeOverride || _onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        autoFocus={autofocus}
        required={required}
        disabled={disabled || readonly}
        {...otherProps}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          rawErrors.length > 0 ? 'border-red-600' : 'border-gray-300'
        }`}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />

      {/* Error Message */}
      {rawErrors.length > 0 && (
        <p className='mt-1 text-sm text-red-600'>
          {rawErrors.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </p>
      )}

      {/* Examples Datalist */}
      {Array.isArray(schema.examples) && (
        <datalist id={examplesId<T>(id)}>
          {(schema.examples as string[])
            .concat(schema.default && !schema.examples.includes(schema.default) ? ([schema.default] as string[]) : [])
            .map((example: any) => (
              <option key={example} value={example} />
            ))}
        </datalist>
      )}
    </div>
  );
}
