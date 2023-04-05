import BEMHelper, { WordSet } from "react-bem-helper";

type Styles = {
  readonly [key: string]: string;
};

type ClassNames = (
  element?: string,
  modifiers?: WordSet,
  extra?: WordSet
) => string;

export const create = (styles: Styles, name: string): ClassNames => {
  const bem = new BEMHelper({ name, outputIsString: true });

  return (element, modifiers, extra) => {
    const className = bem(element, modifiers, extra);
    const classNames = className.split(" ");

    return classNames.map((key) => styles[key] || key).join(" ");
  };
};
