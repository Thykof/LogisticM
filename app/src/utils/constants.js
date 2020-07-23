export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const PRODUCT_SHIPPED = "ProductShipped"
export const PRODUCT_RECEIVED = "ProductReceived"
export const DELIVERY_MAN_ADDED = "DeliveryManAdded"
export const DELIVERY_MAN_REMOVED = "DeliveryManRemoved"
export const MAKER_ADDED = "MakerAdded"
export const MAKER_REMOVED = "MakerRemoved"
export const TRANSFER = "Transfer"

export const EVENT_NAMES = [
	MAKER_ADDED,
	MAKER_REMOVED,
	DELIVERY_MAN_ADDED,
	DELIVERY_MAN_REMOVED,
	"OwnershipTransferred",
	TRANSFER,
	PRODUCT_SHIPPED,
	PRODUCT_RECEIVED
]

export const DELIVERY_MAN_EVENT_NAMES = [
	DELIVERY_MAN_ADDED,
	DELIVERY_MAN_REMOVED,
	PRODUCT_SHIPPED,
	PRODUCT_RECEIVED
]

export const MAKER_EVENT_NAMES = [
	DELIVERY_MAN_ADDED,
	DELIVERY_MAN_REMOVED,
	PRODUCT_SHIPPED,
	PRODUCT_RECEIVED,
	TRANSFER
]

export const PRODUCT_EVENT_NAMES = [PRODUCT_SHIPPED, PRODUCT_RECEIVED]
