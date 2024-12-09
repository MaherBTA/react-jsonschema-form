import { errorId, FieldErrorProps, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ errors = [], idSchema }: FieldErrorProps<T, S, F>) {
  if (errors.length === 0) {
    return null;
  }
  const id = errorId<T>(idSchema);

  return (
    <ul className='space-y-2 mt-2'>
      {errors.map((error, i: number) => (
        <li key={i} className='text-sm text-red-600'>
          <span id={id} className='block'>
            {error}
          </span>
        </li>
      ))}
    </ul>
  );
}
