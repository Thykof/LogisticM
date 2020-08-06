import { generateStore } from '@drizzle/store'

import getOptions from './drizzleOptions'
import appMiddlewares from './middleware'
import { eventsReducer } from "./reducers"

// create the store
export default function getStore(library) {
  return generateStore({
    drizzleOptions: getOptions(library),
    appMiddlewares,
    appReducers: { events: eventsReducer },
    disableReduxDevTools: false  // enable ReduxDevTools!
  })
}
