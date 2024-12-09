import { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { ThemeProps } from '@rjsf/core';

import { generateTemplates } from '../Templates'; // Tailwind-styled templates
import { generateWidgets } from '../Widgets'; // Tailwind-styled widgets

/**
 * Generates a theme with Tailwind CSS styling for use with RJSF forms.
 *
 * @returns A theme configuration object
 */
export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(), // Include Tailwind classes in templates
    widgets: generateWidgets<T, S, F>(), // Include Tailwind classes in widgets
  };
}

export default generateTheme;
