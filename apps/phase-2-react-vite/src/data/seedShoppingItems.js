import { SHOPPING_CATEGORY } from './shoppingOptions.js'
import { createShoppingItem } from '../domain/shoppingItem.js'

export const seedShoppingItems = [
  createShoppingItem({
    id: 'shopping_apples',
    name: 'Apples',
    store: 'Tesco',
    quantity: 4,
    category: SHOPPING_CATEGORY.GROCERIES,
    department: 'fruit-and-veg',
  }),
  createShoppingItem({
    id: 'shopping_milk',
    name: 'Milk',
    store: 'Lidl',
    quantity: 1,
    category: SHOPPING_CATEGORY.GROCERIES,
    department: 'dairy-and-eggs',
  }),
  createShoppingItem({
    id: 'shopping_dog_food',
    name: 'Dog food',
    quantity: 2,
    category: SHOPPING_CATEGORY.GROCERIES,
    department: 'pet-supplies',
  }),
  createShoppingItem({
    id: 'shopping_washing_liquid',
    name: 'Washing-up liquid',
    quantity: 1,
    category: SHOPPING_CATEGORY.HOUSEHOLD,
    department: 'cleaning',
  }),
  createShoppingItem({
    id: 'shopping_bulbs',
    name: 'Light bulbs',
    store: 'Woodies',
    quantity: 2,
    category: SHOPPING_CATEGORY.MAINTENANCE,
    department: 'electrical',
  }),
  createShoppingItem({
    id: 'shopping_bread',
    name: 'Bread',
    store: 'Tesco',
    quantity: 1,
    category: SHOPPING_CATEGORY.GROCERIES,
    department: 'bakery',
    isBought: true,
  }),
]
