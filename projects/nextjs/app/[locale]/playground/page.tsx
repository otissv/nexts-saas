'use client'

import React from 'react'

import { TagsInput, TagInput, TagItem, TagInputItem } from '@/components/tags'

const fruits = [
  { id: 'apple', value: 'Apples' },
  { id: 'banana', value: 'Bananas' },
  { id: 'orange', value: 'Oranges' },
  { id: 'grape', value: 'Grapes' },
  { id: 'pineapple', value: 'Pineapples' },
  { id: 'watermelon', value: 'Watermelons' },
  { id: 'lemon', value: 'Lemons' },
  { id: 'strawberry', value: 'Strawberries' },
  { id: 'peach', value: 'Peaches' },
  { id: 'mango', value: 'Mangoes' },
  { id: 'cherry', value: 'Cherries' },
  { id: 'pear', value: 'Pears' },
  { id: 'raspberry', value: 'Raspberries' },
  { id: 'blackberry', value: 'Blackberries' },
  { id: 'blueberry', value: 'Blueberries' },
  { id: 'kiwi', value: 'Kiwis' },
  { id: 'papaya', value: 'Papayas' },
  { id: 'plum', value: 'Plums' },
  { id: 'coconut', value: 'Coconuts' },
  { id: 'avocado', value: 'Avocados' },
  { id: 'lime', value: 'Limes' },
  { id: 'grapefruit', value: 'Grapefruits' },
  { id: 'melon', value: 'Melons' },
  { id: 'nectarine', value: 'Nectarines' },
  { id: 'apricot', value: 'Apricots' },
  { id: 'fig', value: 'Figs' },
  { id: 'pomegranate', value: 'Pomegranates' },
  { id: 'passionfruit', value: 'Passionfruits' },
  { id: 'dragonfruit', value: 'Dragonfruits' },
  { id: 'guava', value: 'Guavas' },
  { id: 'lychee', value: 'Lychees' },
  { id: 'persimmon', value: 'Persimmons' },
  { id: 'tangerine', value: 'Tangerines' },
  { id: 'starfruit', value: 'Starfruits' },
  { id: 'jackfruit', value: 'Jackfruits' },
  { id: 'durian', value: 'Durians' },
  { id: 'kiwano', value: 'Kiwano' },
  { id: 'rambutan', value: 'Rambutans' },
  { id: 'quince', value: 'Quinces' },
  { id: 'kumquat', value: 'Kumquats' },
  { id: 'loquat', value: 'Loquats' },
  { id: 'sapote', value: 'Sapotes' },
  { id: 'soursop', value: 'Soursops' },
  { id: 'cherimoya', value: 'Cherimoyas' },
  { id: 'feijoa', value: 'Feijoas' },
  { id: 'mangosteen', value: 'Mangosteens' },
  { id: 'longan', value: 'Longans' },
  { id: 'date', value: 'Dates' },
  { id: 'jambolan', value: 'Jambolans' },
  { id: 'whiteSapote', value: 'White Sapotes' },
]

export default function Playground() {
  const [state, setState] = React.useState<TagInputItem[]>([])
  const [selectedState, setSelectedState] = React.useState<TagInputItem[]>([])

  const handleClose = (id: string) => {
    setState(state.filter((s) => s.id !== id))
  }

  const handleOnUpdate = (tagItems: TagInputItem[]) => {
    // const item = fruits.find((f) => f.id === tagItem.id)

    // //TODO: fix duplicate
    // if (!item || state.find((s) => s.id === tagItem.id)) return

    // console.log([...state, item])

    setState(tagItems)
  }

  const handleRemoveItem = (id: string) => {
    setSelectedState(selectedState.filter((s) => s.id !== id))
  }

  const handleOnSelectedUpdate = (items: TagInputItem[]) => {
    setSelectedState(items)
  }

  return (
    <div className="grid p-4 justify-center grid-rows-2 gap-8">
      <TagsInput>
        {state.map(({ id, value }) => {
          return (
            <TagItem
              key={id}
              id={id}
              value={value}
              onRemoveItem={handleClose}
            />
          )
        })}
        <TagInput placeholder="Fruits..." onUpdate={handleOnUpdate} />
      </TagsInput>

      <TagsInput>
        {selectedState.map(({ id, value }) => {
          return (
            <TagItem
              key={id}
              id={id}
              value={value}
              onRemoveItem={handleRemoveItem}
            />
          )
        })}
        <TagInput
          selectedItems={selectedState}
          items={fruits}
          placeholder="Fruits..."
          onUpdate={handleOnSelectedUpdate}
        />
      </TagsInput>
    </div>
  )
}
