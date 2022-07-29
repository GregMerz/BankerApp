export const transformTransactionData = (data) => {
  return data.latest_transactions.map((t, index) => {
    const item = {
      key: index,
      title: t.name, 
      cost: t.amount,
    }
    return item
  })
}
