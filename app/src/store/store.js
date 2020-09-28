import { generateStore } from '@drizzle/store'

import appMiddlewares from './middleware'
import { eventsReducer, offlineReducer } from "./reducers"

export default function getStore(drizzleOptions) {
    return generateStore({
      drizzleOptions,
      appMiddlewares,
      appReducers: { events: eventsReducer, offline: offlineReducer },
      disableReduxDevTools: false  // enable ReduxDevTools!
    })
}
