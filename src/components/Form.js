import { useState } from 'react'

const Form = ({ setItems }) => {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAddItems = item => setItems(items => [...items, item])
  const handleSubmit = e => {
    e.preventDefault()
    const newItem = { description, quantity, packed: false, id: Date.now() }
    if (!description) return
    ;[].push(newItem)
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

export default Form
