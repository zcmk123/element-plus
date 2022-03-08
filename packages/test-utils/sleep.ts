export const sleep = (time = 0) =>
  new Promise<void>((resolve) => setTimeout(resolve, time))
export const microtask = () =>
  new Promise<void>((resolve) => queueMicrotask(resolve))
