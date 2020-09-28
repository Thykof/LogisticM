import { getValue } from '../indexedDB'

export const call = async (drizzle, methodName, args = []) => {
  return await getValue(methodName + args.join())
}

export const get = (drizzleState, methodName, dataKey) => {
  return null
}
