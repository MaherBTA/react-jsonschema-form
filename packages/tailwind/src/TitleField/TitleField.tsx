/**
 * The `TitleField` is the template to use to render the title of a field.
 *
 * @param props - The `TitleFieldProps` for this component
 */
import { FormContextType, TitleFieldProps, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';

export default function TitleField<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  id,
  title,
}: TitleFieldProps<T, S, F>) {
  return (
    <div id={id} className='my-4'>
      <h2 className='text-2xl font-semibold text-gray-800'>{title}</h2>
      <div className='h-px bg-gray-300 mt-2'></div>
    </div>
  );
}
