import { useState } from 'react'
import {
  getShoppingCategory,
  SHOPPING_CATEGORIES,
  SHOPPING_CATEGORY,
} from '../../data/shoppingOptions.js'
import FormField from '../tasks/FormField.jsx'

const INITIAL_FORM = {
  name: '',
  store: '',
  quantity: '1',
  category: SHOPPING_CATEGORY.GROCERIES,
  department: '',
}

function ShoppingForm({ onItemAdd }) {
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [formError, setFormError] = useState('')
  const departments = getShoppingCategory(formValues.category).departments

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
      ...(name === 'category' ? { department: '' } : {}),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const name = formValues.name.trim()
    const quantity = Number(formValues.quantity)

    if (!name) {
      setFormError('Enter an item name.')
      return
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setFormError('Quantity must be a whole number of at least 1.')
      return
    }

    onItemAdd({
      name,
      store: formValues.store,
      quantity,
      category: formValues.category,
      department: formValues.department || null,
    })
    setFormValues(INITIAL_FORM)
    setFormError('')
  }

  return (
    <form className="shopping-form" noValidate onSubmit={handleSubmit}>
      <FormField label="Item name" name="shopping-name">
        <input
          id="shopping-name"
          name="name"
          value={formValues.name}
          onChange={handleFieldChange}
          autoComplete="off"
          aria-describedby="shopping-form-error"
          required
        />
      </FormField>

      <FormField label="Store (optional)" name="shopping-store">
        <input
          id="shopping-store"
          name="store"
          value={formValues.store}
          onChange={handleFieldChange}
          autoComplete="off"
        />
      </FormField>

      <FormField label="Quantity" name="shopping-quantity">
        <input
          id="shopping-quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={formValues.quantity}
          onChange={handleFieldChange}
          required
        />
      </FormField>

      <FormField label="Category" name="shopping-category">
        <select
          id="shopping-category"
          name="category"
          value={formValues.category}
          onChange={handleFieldChange}
        >
          {SHOPPING_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Department" name="shopping-department">
        <select
          id="shopping-department"
          name="department"
          value={formValues.department}
          onChange={handleFieldChange}
        >
          <option value="">Other</option>
          {departments.map((department) => (
            <option key={department.value} value={department.value}>
              {department.label}
            </option>
          ))}
        </select>
      </FormField>

      <button type="submit">Add item</button>
      <p className="form-error" id="shopping-form-error" aria-live="polite">
        {formError}
      </p>
    </form>
  )
}

export default ShoppingForm
