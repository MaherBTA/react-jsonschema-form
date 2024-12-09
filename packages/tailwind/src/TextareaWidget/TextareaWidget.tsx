import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps, getTemplate } from '@rjsf/utils';

/** The `TextareaWidget` is a widget for rendering input fields as textarea with Tailwind styling.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>('BaseInputTemplate', registry, options);

  // Default rows for the textarea
  let rows: string | number = 5;
  if (typeof options.rows === 'string' || typeof options.rows === 'number') {
    rows = options.rows;
  }

  // Pass props to the BaseInputTemplate and enable multiline with Tailwind classes
  return (
    <BaseInputTemplate
      {...props}
      multiline
      rows={rows}
      className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
    />
  );
}
