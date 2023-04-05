import { create } from "@/helpers/createBem";
import { FC, ReactNode } from "react";

import styles from "./InputError.module.scss";

const bem = create(styles, "InputError");

export type InputErrorProps = {
  id: string;
  children: ReactNode;
};

export const InputError: FC<InputErrorProps> = ({ id, children }) => (
  <small role="alert" id={id} className={bem()}>
    {children}
  </small>
);
