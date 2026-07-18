export const SHOPPING_CATEGORY = {
  GROCERIES: 'groceries',
  HOUSEHOLD: 'household',
  MAINTENANCE: 'maintenance',
  OTHER: 'other',
}

export const SHOPPING_CATEGORIES = [
  {
    value: SHOPPING_CATEGORY.GROCERIES,
    label: 'Groceries',
    departments: [
      { value: 'fruit-and-veg', label: 'Fruit and veg' },
      { value: 'meat-and-seafood', label: 'Meat and seafood' },
      { value: 'dairy-and-eggs', label: 'Dairy and eggs' },
      { value: 'bakery', label: 'Bakery' },
      { value: 'pantry', label: 'Pantry' },
      { value: 'frozen', label: 'Frozen' },
      { value: 'drinks', label: 'Drinks' },
      { value: 'snacks', label: 'Snacks' },
      { value: 'pet-supplies', label: 'Pet supplies' },
    ],
  },
  {
    value: SHOPPING_CATEGORY.HOUSEHOLD,
    label: 'Household',
    departments: [
      { value: 'cleaning', label: 'Cleaning' },
      { value: 'laundry', label: 'Laundry' },
      { value: 'kitchen-supplies', label: 'Kitchen supplies' },
      { value: 'bathroom-supplies', label: 'Bathroom supplies' },
      { value: 'paper-products', label: 'Paper products' },
    ],
  },
  {
    value: SHOPPING_CATEGORY.MAINTENANCE,
    label: 'Maintenance',
    departments: [
      { value: 'tools', label: 'Tools' },
      { value: 'electrical', label: 'Electrical' },
      { value: 'plumbing', label: 'Plumbing' },
      { value: 'garden', label: 'Garden' },
      { value: 'paint-and-decorating', label: 'Paint and decorating' },
    ],
  },
  {
    value: SHOPPING_CATEGORY.OTHER,
    label: 'Other',
    departments: [],
  },
]

export function getShoppingCategory(categoryValue) {
  return SHOPPING_CATEGORIES.find(
    (category) => category.value === categoryValue,
  )
}

export function getDepartmentLabel(categoryValue, departmentValue) {
  if (departmentValue === null) {
    return 'Other'
  }

  return getShoppingCategory(categoryValue)?.departments.find(
    (department) => department.value === departmentValue,
  )?.label
}
