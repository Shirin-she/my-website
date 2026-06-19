import { animate, hover } from "motion"

// Apply a subtle scale-up on hover for all buttons
hover("button", (element) => {
  // small scale and quick duration for a classy effect
  animate(element, { scale: 1.04 }, { duration: 0.18 })

  return () => animate(element, { scale: 1 }, { duration: 0.18 })
})
