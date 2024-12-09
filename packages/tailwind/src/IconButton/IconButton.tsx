import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';
import { FaArrowUp, FaArrowDown, FaRegCopy, FaTrashAlt } from 'react-icons/fa'; // Import from React Icons

/** The custom IconButton component in Tailwind CSS */
export default function TailwindIconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const { icon, color, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      className={`inline-flex items-center justify-center p-1 text-sm ${
        color === 'secondary' ? 'text-red-500' : 'text-gray-500'
      } rounded hover:bg-gray-200 focus:outline-none`}
    >
      {icon}
    </button>
  );
}

/** The Copy button in Tailwind CSS */
export function CopyButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;

  return (
    <TailwindIconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={<FaRegCopy className="h-5 w-5" />}
    />
  );
}

/** The MoveDown button in Tailwind CSS */
export function MoveDownButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;

  return (
    <TailwindIconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={<FaArrowDown className="h-5 w-5" />}
    />
  );
}

/** The MoveUp button in Tailwind CSS */
export function MoveUpButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;

  return (
    <TailwindIconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={<FaArrowUp className="h-5 w-5" />}
    />
  );
}

/** The Remove button in Tailwind CSS */
export function RemoveButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const { iconType, ...otherProps } = props;
  const {
    registry: { translateString },
  } = otherProps;

  return (
    <TailwindIconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...otherProps}
      color="secondary"
      icon={<FaTrashAlt className={iconType === 'default' ? 'h-6 w-6' : 'h-5 w-5'} />}
    />
  );
}
