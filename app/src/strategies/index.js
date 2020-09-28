import { call as callOffline, get as getOffline} from './offline'
import { call as callOnline, get as getOnline} from './online'

export const call = async (drizzleState, drizzle, methodName, args) => {
  if (drizzleState.offline.offline === true) {
    return await callOffline(drizzle, methodName, args)
  }
  else if (drizzleState.offline.offline === false) {
    return callOnline(drizzle, methodName, args)
  } else {
    console.log("incorect state");
  }
}

export const get = (drizzleState, methodName, dataKey) => {
  if (drizzleState.offline.offline === true) {
    return getOffline(drizzleState, methodName, dataKey)
  }
  else if (drizzleState.offline.offline === false) {
    return getOnline(drizzleState, methodName, dataKey)
  } else {
    console.log("incorect state");
  }
}
