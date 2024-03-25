'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TagProps {
  label: string
  onDelete: () => void
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
  return (
    <div className="inline-flex items-center px-2 py-1 bg-blue-500 text-white rounded">
      <span className="mr-2">{label}</span>
      <button
        onClick={onDelete}
        className="rounded-full p-1 hover:bg-blue-600 focus:outline-none"
      >
        <X size={16} color="white" />
      </button>
    </div>
  )
}

const TagsInput: React.FC = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('')

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue])
        setInputValue('')
      }
    }
  }

  return (
    <div className="flex items-center border rounded p-1">
      {tags.map((tag, index) => (
        <Tag key={tag} label={tag} onDelete={() => handleDelete(index)} />
      ))}
      <Input
        variant="ghost"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Fruits..."
        className="outline-none"
      />
      <Button
        className="ml-2 text-blue-500"
        onClick={() => {
          if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()])
            setInputValue('')
          }
        }}
      >
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  )
}

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
  const [tags, setTags] = useState<string[]>([])

  return (
    <div className="App">
      <h1>Tags Input Example</h1>
      <TagsInput tags={tags} setTags={setTags} />
      <div className="mt-4">
        <strong>Tags:</strong>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
