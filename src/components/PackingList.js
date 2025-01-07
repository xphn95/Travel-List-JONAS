import { useState } from 'react'
import Item from './Item'

const PackingList = ({ items, onToggleItem, onDeleteItem, onClearList }) => {
  const [sortBy, setSortBy] = useState('input')
  let sortedItems
  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort(({ description: a }, { description: b }) => a.localeCompare(b))
  if (sortBy === 'packed')
    sortedItems = items.slice().sort(({ packed: a }, { packed: b }) => +a - +b)
  return (
    <div className='list'>
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className='actions'>
        <select
          value={sortBy}
          onChange={({ target: { value } }) => setSortBy(value)}
        >
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  )
}

export default PackingList
