import type { JSX, ComponentChild, ComponentFactory, ComponentAttributes } from './type';
import { isSvgTag, setElementStyle, applyChildren } from './utils';

export const xlinkNS = 'http://www.w3.org/1999/xlink';

export function h(
  tag: string | ComponentFactory,
  attrs: null | ComponentAttributes,
  ...children: ComponentChild[]
): JSX.Element {
  if (typeof tag === 'function') return tag({ ...attrs, children });
  const isSvg = isSvgTag(tag);
  const element = isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  if (attrs) {
    if (attrs.style && typeof attrs.style !== 'string') {
      setElementStyle(element, attrs.style as Partial<CSSStyleDeclaration>);
      delete attrs.style;
    }

    for (const name of Object.keys(attrs)) {
      const value = attrs[name];
      if (name.startsWith('on')) {
        const finalName = name.replace(/Capture$/, '');
        const useCapture = name !== finalName;
        const eventName = finalName.toLowerCase().substring(2);
        element.addEventListener(eventName, value as EventListenerOrEventListenerObject, useCapture);
      } else if (isSvg && name.startsWith('xlink:')) {
        element.setAttributeNS(xlinkNS, name, value as string);
      } else if (value === true) {
        element.setAttribute(name, name);
      } else if (value || value === 0) {
        element.setAttribute(name, value.toString());
      }
    }
  }

  applyChildren(element, children);
  return element;
}
