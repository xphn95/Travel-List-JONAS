import { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

/* const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true }
] */

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

  const handleClearList = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    )

    confirmed && setItems([])
  }

  return (
    <div className='app'>
      <Logo />
      <Form setItems={setItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onToggleItem={handleChange}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}
