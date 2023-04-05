import {
  Item as AccordionItem,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from "@radix-ui/react-accordion";

import { FC, ReactNode } from "react";

import { create } from "@/helpers/createBem";

import styles from "./CollapsibleItem.module.scss";

const bem = create(styles, "CollapsibleItem");

export type CollapsibleItemProps = {
  value: string;
  title: ReactNode;
  children: ReactNode;
};

export const CollapsibleItem: FC<CollapsibleItemProps> = ({
  title,
  value,
  children,
}) => {
  return (
    <AccordionItem className={bem()} value={value}>
      <AccordionTrigger className={bem("header")}>{title}</AccordionTrigger>

      <AccordionContent className={bem("content")}>
        <div className={bem("content__holder")}>{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
};
