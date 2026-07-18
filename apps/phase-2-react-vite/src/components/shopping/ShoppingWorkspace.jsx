import ShoppingForm from './ShoppingForm.jsx'
import ShoppingList from './ShoppingList.jsx'

function ShoppingWorkspace({
  items,
  onItemAdd,
  onItemBoughtChange,
  onItemDelete,
  onClearBought,
}) {
  return (
    <section aria-labelledby="shopping-workspace-heading">
      <h2 className="visually-hidden" id="shopping-workspace-heading">
        Shopping workspace
      </h2>
      <ShoppingForm onItemAdd={onItemAdd} />
      <ShoppingList
        items={items}
        onBoughtChange={onItemBoughtChange}
        onDelete={onItemDelete}
        onClearBought={onClearBought}
      />
    </section>
  )
}

export default ShoppingWorkspace
