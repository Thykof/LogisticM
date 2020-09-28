export const call = async (drizzle, methodName, args = []) => {
  return drizzle.contracts.Logistic.methods[methodName].cacheCall(...args);
}

export const get = (drizzleState, methodName, dataKey) => {
  const result = drizzleState.contracts.Logistic[methodName][dataKey]
  if (result) {
    return result.value
  }
  else {
    return undefined
  }
}
