import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';

export default function AddButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  uiSchema,
  registry,
  ...props
}: IconButtonProps<T, S, F>) {
  const { translateString } = registry;

  return (
    <button
      title={translateString(TranslatableString.AddItemButton)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
    >
      <i className='fas fa-plus'></i> {/* FontAwesome Plus Icon */}
    </button>
  );
}
