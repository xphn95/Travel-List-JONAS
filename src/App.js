import { useState } from 'react'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true }
]

const Logo = () => {
  return <h1>🌴 Far Away 🎒</h1>
}

const Form = ({ setItems }) => {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAddItems = item => setItems(items => [...items, item])
  const handleSubmit = e => {
    e.preventDefault()
    const newItem = { description, quantity, packed: false, id: Date.now() }
    if (!description) return
    initialItems.push(newItem)
    handleAddItems(newItem)
    setDescription('')
    setQuantity(1)
  }
  return (
    // <form className='add-form' onSubmit={e=>handleSubmit(e)}>
    // 可以省略为下面这样
    <form
      className='add-form'
      onSubmit={handleSubmit}
    >
      <h3>What do you need for your 😊 trip?</h3>
      <select
        value={quantity}
        onChange={({ target: { value } }) => setQuantity(+value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(item => (
          <option
            value={item}
            key={item}
          >
            {item}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />
      <button>Add</button>
    </form>
  )
}

const Item = ({ item, onToggleItem, onDeleteItem }) => {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

const PackingList = ({ items, onToggleItem, onDeleteItem }) => {
  const [sortBy, setSortBy] = useState('input')

  return (
    <div className='list'>
      <ul>
        {items.map(item => (
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
      </div>
    </div>
  )
}

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

export default function App() {
  const [items, setItems] = useState([])
  const handleChange = id =>
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  const handleDeleteItem = id =>
    setItems(items => items.filter(item => item.id !== id))

  return (
    <div className='app'>
      <Logo />
      <Form setItems={setItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onToggleItem={handleChange}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  )
}
