import {
  AutocompleteCheckboxOption,
  handleAutocompleteCheckboxOnSelect,
  AutocompleteCheckbox,
  AutocompleteCheckboxInput,
  AutocompleteCheckboxContent,
  AutocompleteCheckboxList,
} from '@/components/autocomplete-checkbox'
import React from 'react'

// Usage example
const fruitsOptions = [
  { id: '1', value: 'Apple' },
  { id: '2', value: 'Banana' },
  { id: '3', value: 'Cherry' },
  // Add more fruits as needed
]

const FruitsSelectionComponent: React.FC = () => {
  const [selectedFruitIds, setSelectedFruitIds] = React.useState<
    AutocompleteCheckboxOption[]
  >([])

  const [filter, setFilter] = React.useState('')

  const handleOnSelect = handleAutocompleteCheckboxOnSelect({
    options: fruitsOptions,
    selectedValues: selectedFruitIds,
    onSelect: setSelectedFruitIds,
  })

  return (
    <AutocompleteCheckbox>
      <AutocompleteCheckboxInput
        filter={filter}
        setFilter={setFilter}
        placeholder="Filter"
      />
      <AutocompleteCheckboxContent>
        <AutocompleteCheckboxList
          filter={filter}
          options={fruitsOptions}
          selectedValues={selectedFruitIds}
          onSelect={handleOnSelect}
        />
      </AutocompleteCheckboxContent>
    </AutocompleteCheckbox>
  )
}

export default FruitsSelectionComponent
