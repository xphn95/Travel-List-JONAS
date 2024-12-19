const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true }
]

const Logo = () => {
  return <h1>🌴 Far Away 🎒</h1>
}

const Form = () => {
  return (
    <div className="add-form">
      <h3>What do you need for your 😊 trip?</h3>
    </div>
  )
}

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

const PackingList = () => (
  <div className="list">
    <ul>
      {initialItems.map(item => (
        <Item item={item} />
      ))}
    </ul>
  </div>
)

const Stats = () => (
  <footer className="stats">
    <em>🧳 You have X items on your list, and you already packed X (X%)</em>
  </footer>
)

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}
