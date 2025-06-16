import * as React from 'react'
import classNames from 'classnames'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { RiArrowDownSLine } from '@remixicon/react'
import { Flex } from '@radix-ui/themes'

type AccordionItemType = {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
}

type AccordionBaseProps = {
  items: AccordionItemType[]
  className?: string
}

type AccordionSingle = {
  type: 'single'
  defaultValue?: string
  collapsible?: boolean
}

type AccordionMultiple = {
  type: 'multiple'
  defaultValue?: string[]
}

type AccordionProps = AccordionBaseProps & (AccordionSingle | AccordionMultiple)

const Accordion = ({ items, className, ...props }: AccordionProps) => {
  return (
    <RadixAccordion.Root
      className={classNames(
        'bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </RadixAccordion.Root>
  )
}

export default Accordion

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ children, className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={classNames(
      'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b',
      className
    )}
    {...props}
  >
    {children}
  </RadixAccordion.Item>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ children, className, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={classNames(
        'group flex h-[45px] flex-1 cursor-pointer items-center gap-2 px-2 text-[15px] leading-none outline-none hover:bg-slate-950',
        className
      )}
      {...props}
    >
      <Flex justify="between" className="w-full">
        {children}
      </Flex>
      <RiArrowDownSLine
        className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ children, className, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={classNames(
      'data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden text-[15px]',
      className
    )}
    {...props}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </RadixAccordion.Content>
))
AccordionContent.displayName = 'AccordionContent'

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent
