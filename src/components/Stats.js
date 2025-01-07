const Stats = ({ items }) => {
  const count = items.length
  if (!count) {
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list📋</em>
      </p>
    )
  }
  const packedCount = items.reduce((acc, item) => {
    item.packed && acc++
    return acc
  }, 0)

  const percentage = ((packedCount / count) * 100 || 0).toFixed(2)

  return (
    <footer className='stats'>
      <em>
        {percentage === '100.00'
          ? 'You got everything! Ready to go 🛫'
          : `🧳 You have ${count} items on your list, and you already packed ${packedCount} (${percentage}%)`}
      </em>
    </footer>
  )
}

export default Stats
