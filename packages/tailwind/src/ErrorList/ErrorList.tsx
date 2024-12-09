import { ErrorListProps, FormContextType, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';

/** The `ErrorList` component is the template that renders all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  errors,
  registry,
}: ErrorListProps<T, S, F>) {
  const { translateString } = registry;

  return (
    <div className='bg-white shadow-md rounded-lg mb-4 p-4'>
      <h6 className='text-lg font-semibold text-red-600'>{translateString(TranslatableString.ErrorsLabel)}</h6>
      <ul className='space-y-2'>
        {errors.map((error, i: number) => (
          <li key={i} className='flex items-start space-x-2'>
            <svg
              className='w-5 h-5 text-red-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M4.929 4.929l14.142 14.142M19.071 4.929l-14.142 14.142'
              />
            </svg>
            <span className='text-sm text-gray-700'>{error.stack}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
