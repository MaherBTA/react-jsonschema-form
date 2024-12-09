import { CSSProperties, FocusEvent } from 'react';
import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WrapIfAdditionalTemplateProps<T, S, F>) {
  const {
    children,
    classNames,
    style,
    disabled,
    id,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    required,
    schema,
    registry,
  } = props;
  const {  translateString } = registry;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: '1.5rem', // equivalent to paddingLeft: 6
    paddingRight: '1.5rem', // equivalent to paddingRight: 6
    fontWeight: 'bold',
  };

  if (!additional) {
    return (
      <div className={`${classNames}`} style={style}>
        {children}
      </div>
    );
  }

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => onKeyChange(target.value);

  return (
    <div className={`flex items-center space-x-4 ${classNames}`} style={style}>
      <div className='flex-1'>
        <input
          className='w-full p-2 border border-gray-300 rounded-lg'
          required={required}
          defaultValue={label}
          disabled={disabled || readonly}
          id={`${id}-key`}
          name={`${id}-key`}
          onBlur={!readonly ? handleBlur : undefined}
          type='text'
          placeholder={keyLabel}
        />
      </div>
      <div className='flex-1'>{children}</div>
      <div>
        <button
          type='button'
          style={btnStyle}
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
          className='text-red-500'
        >
          Remove
        </button>
      </div>
    </div>
  );
}
