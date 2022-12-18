export const transformTransactionData = (data) => {
  return data.map((t, index) => {
    const item = {
      key: index,
      description: t.name,
      price: t.amount,
    }
    return item
  })
}
