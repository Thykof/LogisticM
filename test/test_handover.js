const truffleAssert = require('truffle-assertions')

const { products } = require('./utils')
const version = require('../versions').latest

const OwnedRegistry = artifacts.require('OwnedRegistry')
const LogisticMInterface = artifacts.require('LogisticMInterface')

contract('Handover', async accounts => {
  const [owner, supplier, deliveryMan1, deliveryMan2, purchaser, other] = accounts
  let instance

  before(async function () {
    // Create proxy
    const ownedRegistry = await OwnedRegistry.deployed()
    const { logs } = await ownedRegistry.createProxy(version)
    const { proxy } = logs.find(l => l.event === 'ProxyCreated').args
    instance = await LogisticMInterface.at(proxy)

    await instance.addSupplier(supplier, { from: owner })
    await instance.addDeliveryMan(deliveryMan1, { from: owner })
    await instance.addDeliveryMan(deliveryMan2, { from: owner })
  })

  it('Create product', async () => {
    await truffleAssert.reverts(
      instance.createProduct(purchaser, products[1].hash,
        products[1].nameBytes32, products[1].purchaserNameBytes32,
        { from: other }),
      'LogisticM: Caller is not Supplier'
    )
    await truffleAssert.reverts(
      instance.createProduct(deliveryMan1, products[1].hash,
        products[1].nameBytes32, products[1].purchaserNameBytes32,
        { from: supplier }),
      'LogisticM: Invalid purchaser'
    )

    const result = await instance.createProduct(
      purchaser, products[0].hash, products[0].nameBytes32, products[0].purchaserNameBytes32,
      { from: supplier })
    truffleAssert.eventEmitted(result, 'NewProduct', ev =>
      ev.by === supplier &&
      ev.purchaser === purchaser &&
      ev.productHash === products[0].hash &&
      ev.productName === products[0].name
    )
    assert.equal(await instance.getHashFromTokenId(products[0].tokenId), products[0].hash)
    assert.equal(await instance.ownerOf(products[0].tokenId), supplier)
    const info = await instance.getProductInfo(products[0].hash)
    assert.equal(info.purchaser, purchaser)
    assert.equal(info.productName, products[0].name)
    assert.equal(info.tokenId.words[0], products[0].tokenId)
    assert.isTrue(await instance.productExists(products[0].hash))

    await truffleAssert.reverts(
      instance.createProduct(
        purchaser, products[0].hash, products[0].nameBytes32, products[0].purchaserNameBytes32,
        { from: supplier }),
      'LogisticM: This product already exists'
    )
  })

  describe('Handover supplier -> deliveryMan1', async function () {
    it('Send product', async () => {
      const result = await instance.send(deliveryMan1, products[0].hash,
        { from: supplier }
      )
      truffleAssert.eventEmitted(result, 'ProductShipped', ev =>
        ev.from === supplier &&
        ev.to === deliveryMan1 &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
    })
    it('Receive product', async () => {
      const result = await instance.receive(supplier, products[0].hash,
        { from: deliveryMan1 })
      truffleAssert.eventEmitted(result, 'Handover', ev =>
        ev.from === supplier &&
        ev.to === deliveryMan1 &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
    })
  })

  describe('Handover deliveryMan1 -> deliveryMan2', async function () {
    it('Receive product', async () => {
      const result = await instance.receive(deliveryMan1, products[0].hash,
        { from: deliveryMan2 })
      truffleAssert.eventEmitted(result, 'ProductReceived', ev =>
        ev.from === deliveryMan1 &&
        ev.by === deliveryMan2 &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
      await truffleAssert.reverts(
        instance.receive(deliveryMan1, products[0].hash,
          { from: deliveryMan2 }),
        'LogisticM: Already received'
      )
    })
    it('Send product', async () => {
      const result = await instance.send(deliveryMan2, products[0].hash,
        { from: deliveryMan1 })
      truffleAssert.eventEmitted(result, 'Handover', ev =>
        ev.from === deliveryMan1 &&
        ev.to === deliveryMan2 &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
      await truffleAssert.reverts(
        instance.send(deliveryMan2, products[0].hash,
          { from: deliveryMan1 }),
        "LogisticM: Can't send a product in pending delivery"
      )
    })
  })

  describe('Handover deliveryMan2 -> purchaser', async function () {
    it('Send product', async () => {
      await truffleAssert.reverts(
        instance.send(other, products[0].hash,
          { from: deliveryMan2 }),
        'LogisticM: This purchaser has not ordered this product'
      )

      const result = await instance.send(purchaser, products[0].hash,
        { from: deliveryMan2 })
      truffleAssert.eventEmitted(result, 'ProductShipped', ev =>
        ev.from === deliveryMan2 &&
        ev.to === purchaser &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
    })
    it('Receive product', async () => {
      await truffleAssert.reverts(
        instance.receive(deliveryMan2, products[0].hash,
          { from: other }),
        'LogisticM: This purchaser has not ordered this product'
      )

      const result = await instance.receive(deliveryMan2, products[0].hash,
        { from: purchaser })
      truffleAssert.eventEmitted(result, 'Handover', ev =>
        ev.from === deliveryMan2 &&
        ev.to === purchaser &&
        ev.productHash === products[0].hash &&
        ev.productName === products[0].name
      )
    })
  })

  describe('Should failed with...', async function () {
    it('...bad caller', async () => {
      await truffleAssert.reverts(
        instance.send(deliveryMan2, products[0].hash,
          { from: owner }),
        "LogisticM: Caller can't send product"
      )
      await truffleAssert.reverts(
        instance.send(deliveryMan2, products[0].hash,
          { from: other }),
        "LogisticM: Caller can't send product"
      )
      await truffleAssert.reverts(
        instance.receive(deliveryMan1, products[0].hash,
          { from: owner }),
        "LogisticM: Caller can't receive product"
      )
      await truffleAssert.reverts(
        instance.receive(deliveryMan1, products[0].hash,
          { from: supplier }),
        "LogisticM: Caller can't receive product"
      )
    })
    it('...argument', async () => {
      await truffleAssert.reverts(
        instance.send(supplier, products[0].hash,
          { from: deliveryMan1 }),
        "LogisticM: Can't send to supplier nor owner"
      )
      await truffleAssert.reverts(
        instance.send(owner, products[0].hash,
          { from: deliveryMan1 }),
        "LogisticM: Can't send to supplier nor owner"
      )
    })
  })

  describe('When paused', async function () {
    before(async function () {
      await instance.pause({ from: owner })
    })

    it('Create product', async () => {
      await truffleAssert.reverts(
        instance.createProduct(
          purchaser, products[0].hash, products[0].nameBytes32, products[0].purchaserNameBytes32,
          { from: supplier }),
        'Pausable: paused'
      )
    })
    it('Send product', async () => {
      await truffleAssert.reverts(
        instance.send(deliveryMan1, products[0].hash,
          { from: supplier }),
        'Pausable: paused'
      )
    })
  })
})
