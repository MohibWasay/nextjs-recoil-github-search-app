import { Root as Accordion } from "@radix-ui/react-accordion"

import { FC, ReactNode } from "react"

import { CollapsibleItem, CollapsibleItemProps } from "./CollapsibleItem"

export type CollapsibleProps = {
  value?: string[]
  children: ReactNode
  items?: (CollapsibleItemProps & { content: ReactNode })[]
  onChangeValue?: (value: string[]) => void
}

export type CompoundCollapsibleType = {
  Item: FC<CollapsibleItemProps>
}

export const Collapsible: FC<CollapsibleProps> & CompoundCollapsibleType = ({
  value,
  items,
  onChangeValue,
  children,
}) => {
  if (items?.length) {
    return (
      <Accordion type="multiple" value={value} onValueChange={onChangeValue}>
        {items.map(({ value, title, content }) => (
          <CollapsibleItem key={value} title={title} value={value}>
            {content}
          </CollapsibleItem>
        ))}
      </Accordion>
    )
  }

  return (
    <Accordion type="multiple" value={value} onValueChange={onChangeValue}>
      {children}
    </Accordion>
  )
}

Collapsible.Item = CollapsibleItem
