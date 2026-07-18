import {
  getDepartmentLabel,
  SHOPPING_CATEGORIES,
} from '../../data/shoppingOptions.js'
import ShoppingItem from './ShoppingItem.jsx'

function ShoppingItems({ items, label, onBoughtChange, onDelete }) {
  return (
    <ul className="shopping-list" aria-label={label}>
      {items.map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          onBoughtChange={onBoughtChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function ShoppingList({ items, onBoughtChange, onDelete, onClearBought }) {
  const activeItems = items.filter((item) => !item.isBought)
  const boughtItems = items.filter((item) => item.isBought)

  return (
    <div className="shopping-results">
      {activeItems.length === 0 ? (
        <p className="empty-results">There are no items left to buy.</p>
      ) : (
        SHOPPING_CATEGORIES.map((category) => {
          const categoryItems = activeItems.filter(
            (item) => item.category === category.value,
          )

          if (categoryItems.length === 0) {
            return null
          }

          const departmentValues = [
            ...category.departments.map((department) => department.value),
            null,
          ]

          return (
            <section className="shopping-category" key={category.value}>
              <h2>{category.label}</h2>
              {departmentValues.map((departmentValue) => {
                const departmentItems = categoryItems.filter(
                  (item) => item.department === departmentValue,
                )

                if (departmentItems.length === 0) {
                  return null
                }

                const departmentLabel = getDepartmentLabel(
                  category.value,
                  departmentValue,
                )

                return (
                  <section className="shopping-department" key={departmentValue ?? 'other'}>
                    <h3>{departmentLabel}</h3>
                    <ShoppingItems
                      items={departmentItems}
                      label={`${category.label}, ${departmentLabel}`}
                      onBoughtChange={onBoughtChange}
                      onDelete={onDelete}
                    />
                  </section>
                )
              })}
            </section>
          )
        })
      )}

      <section className="shopping-category bought-section">
        <div className="shopping-section-heading">
          <h2>Bought</h2>
          <button
            className="clear-bought-button"
            type="button"
            disabled={boughtItems.length === 0}
            onClick={onClearBought}
          >
            Clear bought items
          </button>
        </div>
        {boughtItems.length === 0 ? (
          <p className="empty-results">No bought items.</p>
        ) : (
          <ShoppingItems
            items={boughtItems}
            label="Bought items"
            onBoughtChange={onBoughtChange}
            onDelete={onDelete}
          />
        )}
      </section>
    </div>
  )
}

export default ShoppingList
