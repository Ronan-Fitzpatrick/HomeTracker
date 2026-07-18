import {
  getShoppingCategory,
  SHOPPING_CATEGORIES,
} from '../data/shoppingOptions.js'

export function createShoppingItem({
  id = `shopping_item_${crypto.randomUUID()}`,
  name,
  store = null,
  quantity = 1,
  category,
  department = null,
  isBought = false,
  createdAt = new Date().toISOString(),
}) {
  const item = {
    id,
    name: typeof name === 'string' ? name.trim() : name,
    store:
      typeof store === 'string' && store.trim().length > 0
        ? store.trim()
        : null,
    quantity,
    category,
    department,
    isBought,
    createdAt,
  }

  validateShoppingItem(item)
  return item
}

function validateShoppingItem(item) {
  const isObject =
    item !== null && typeof item === 'object' && !Array.isArray(item)
  const category = isObject ? getShoppingCategory(item.category) : undefined
  const departmentIsValid =
    isObject &&
    (item.department === null ||
      category?.departments.some(
        (department) => department.value === item.department,
      ))

  if (
    !isObject ||
    typeof item.id !== 'string' ||
    item.id.length === 0 ||
    typeof item.name !== 'string' ||
    item.name.trim().length === 0 ||
    (item.store !== null &&
      (typeof item.store !== 'string' || item.store.trim().length === 0)) ||
    !Number.isInteger(item.quantity) ||
    item.quantity < 1 ||
    !SHOPPING_CATEGORIES.some(
      (categoryOption) => categoryOption.value === item.category,
    ) ||
    !departmentIsValid ||
    typeof item.isBought !== 'boolean' ||
    typeof item.createdAt !== 'string' ||
    Number.isNaN(Date.parse(item.createdAt))
  ) {
    throw new Error('Shopping item data is invalid.')
  }

  return item
}

export function validateShoppingItems(items) {
  if (!Array.isArray(items)) {
    throw new Error('Saved shopping items must be an array.')
  }

  const itemIds = new Set()

  for (const item of items) {
    validateShoppingItem(item)

    if (itemIds.has(item.id)) {
      throw new Error(`Saved shopping items contain duplicate ID "${item.id}".`)
    }

    itemIds.add(item.id)
  }

  return items
}
