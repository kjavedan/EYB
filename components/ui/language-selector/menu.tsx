"use client"

import * as Ariakit from "@ariakit/react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import * as React from "react"

export const Menu = React.forwardRef<HTMLButtonElement, any>(function Menu(
  { open, setOpen, label, children, animate, transition, variants, initial, exit, ...props },
  ref,
) {
  const menu = Ariakit.useMenuStore({ open, setOpen })
  const currentPlacement = Ariakit.useStoreState(menu, "currentPlacement")
  const mounted = Ariakit.useStoreState(menu, "mounted")

  return (
    <MotionConfig reducedMotion="user">
      <Ariakit.MenuButton store={menu} ref={ref} {...props} className={"button"}>
        {label}
        <Ariakit.MenuButtonArrow />
      </Ariakit.MenuButton>
      <AnimatePresence>
        {mounted && (
          <Ariakit.Menu
            store={menu}
            alwaysVisible
            className="menu"
            data-placement={currentPlacement}
            render={
              <motion.div initial={initial} exit={exit} animate={animate} variants={variants} transition={transition} />
            }
          >
            <Ariakit.MenuArrow className="menu-arrow" />
            {children}
          </Ariakit.Menu>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
})

const MotionMenuItem = motion.create(Ariakit.MenuItem)

export const MenuItem = React.forwardRef<HTMLDivElement, any>(function MenuItem(props, ref) {
  return <MotionMenuItem ref={ref} {...props} className={"menu-item"} />
})
