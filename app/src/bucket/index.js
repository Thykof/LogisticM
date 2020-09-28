import { getValue } from '../indexedDB'
import { get } from '../contract-call/call'

export default async (drizzle, methodName) => {
	get(drizzle, methodName)

	return await getValue(methodName)
}
