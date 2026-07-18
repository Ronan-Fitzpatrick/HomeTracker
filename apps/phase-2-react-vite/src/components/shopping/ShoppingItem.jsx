function ShoppingItem({ item, onBoughtChange, onDelete }) {
  const metadata = [`Quantity: ${item.quantity}`, item.store]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="shopping-item">
      <input
        className="shopping-checkbox"
        type="checkbox"
        checked={item.isBought}
        aria-label={`Mark ${item.name} ${item.isBought ? 'not bought' : 'bought'}`}
        onChange={(event) => onBoughtChange(item.id, event.target.checked)}
      />
      <div className="shopping-item-content">
        <span className="shopping-item-name">{item.name}</span>
        <span className="shopping-item-meta">{metadata}</span>
      </div>
      <button
        className="shopping-delete-button"
        type="button"
        aria-label={`Delete ${item.name}`}
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default ShoppingItem
