export const roll = sides => Math.floor(sides * Math.random())
export const randBool = () => roll(2) === 1
export const randRange = (min, max) => roll(max - min) + min
