import { ArrayFieldTemplateItemType, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';

/** The `ArrayFieldItemTemplate` component is the template used to render items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    disabled,
    hasToolbar,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onCopyIndexClick,
    onDropIndexClick,
    onReorderClick,
    readonly,
  } = props;

  return (
    <div className='flex items-center space-x-4'>
      {/* Box with Paper Effect */}
      <div className='flex-1 overflow-auto mb-2'>
        <div className='bg-white p-4 shadow-lg rounded-md'>{children}</div>
      </div>

      {/* Toolbar with Buttons */}
      {hasToolbar && (
        <div className='flex flex-col space-y-2'>
          {(hasMoveUp || hasMoveDown) && (
            <button
              className='px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400'
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)}
            >
              Move Up
            </button>
          )}
          {(hasMoveUp || hasMoveDown) && (
            <button
              className='px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400'
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index + 1)}
            >
              Move Down
            </button>
          )}
          {hasCopy && (
            <button
              className='px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 disabled:bg-gray-400'
              disabled={disabled || readonly}
              onClick={onCopyIndexClick(index)}
            >
              Copy
            </button>
          )}
          {hasRemove && (
            <button
              className='px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400'
              disabled={disabled || readonly}
              onClick={onDropIndexClick(index)}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}
