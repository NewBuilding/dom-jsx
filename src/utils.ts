import type { JSX, ComponentChild } from './type';

/**
 * 对element 设置style
 * @param element
 * @param style
 */
export function setElementStyle(element: JSX.Element, style: Partial<CSSStyleDeclaration>) {
  let key: keyof CSSStyleDeclaration;
  const keys = Object.keys(style) as Array<keyof CSSStyleDeclaration>;
  for (key of keys) {
    // @ts-ignore
    element.style[key] = style[key];
  }
}

/**
 * 添加 child 至element中
 * @param element
 * @param child
 */
function applyChild(element: JSX.Element, child: ComponentChild) {
  if (child instanceof HTMLElement) {
    element.appendChild(child);
  } else if (typeof child === 'string' || typeof child === 'number') {
    element.appendChild(document.createTextNode(child.toString()));
  } else {
    console.warn('Unknown type to append: ', child);
  }
}

/**
 * 添加children
 * @param element
 * @param children
 */
export function applyChildren(element: JSX.Element, children: ComponentChild[]) {
  for (const child of children) {
    if (!child && child !== 0) continue;

    if (Array.isArray(child)) {
      for (const grandChild of child) {
        if (Array.isArray(grandChild)) {
          applyChildren(element, grandChild);
        } else {
          applyChild(element, grandChild);
        }
      }
    } else {
      applyChild(element, child);
    }
  }
}

export function isSvgTag(tag: string): boolean {
  return [
    'a',
    'circle',
    'clipPath',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'foreignObject',
    'g',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'metadata',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'script',
    'stop',
    'style',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'title',
    'tspan',
    'use',
    'view',
  ].includes(tag);
}
