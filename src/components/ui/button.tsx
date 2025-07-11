import type { ComponentProps } from "react"
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'text-zinc-400 rounded-lg hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer disabled:pointer-events-none disabled:opacity-50',

  variants: {
    size: {
      default: 'px-4 py-2',
      icon: 'p-2',
      'icon-sm': 'p-1'
    }
  },
  
  defaultVariants: {
    size: 'default'
  }
})

export const Button = ({ size, className, ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <button className={buttonVariants({ size, className })} {...props} />
  )
}