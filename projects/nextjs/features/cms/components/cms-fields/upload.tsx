'use client'

import React from 'react'
import { Accept, FileRejection, useDropzone } from 'react-dropzone'
import { CircleX, CloudUpload, File, FileMusic } from 'lucide-react'

import { Popover } from '@/components/plate-ui/popover'
import { Input } from '@/components/ui/input'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { isObjectInCollectionByProperty } from '@/lib/compareCollections'
import { Button } from '@/components/ui/button'
import { formatBytes } from '@/lib/formatBytes'
import { Label } from '@/components/ui/label'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { CmsField, GetFieldComponent } from '../cms-config'
import { UploadOption } from '../../cms.types'
import {
  AutocompleteCheckbox,
  AutocompleteCheckboxContent,
  AutocompleteCheckboxInput,
  AutocompleteCheckboxList,
  AutocompleteCheckboxOption,
  handleAutocompleteCheckboxOnSelect,
} from '@/components/autocomplete-checkbox'
import { TagInput, TagInputItem, TagItem, TagsInput } from '@/components/tags'

export type UploadFile = File & {
  alt: string
  preview: string
}

function UploadTextField({
  id,
  accept,
  files = [],
  maxFiles = 1,
  maxSize = 500000,
  minSize,
  multiple,
  type,
  setFiles,
}: {
  id: string
  accept?: Accept
  files: UploadFile[]
  maxFiles?: File['size']
  maxSize?: number
  minSize?: number
  multiple?: boolean
  type: 'audio' | 'document' | 'image' | 'video'
  setFiles: (newValue: UploadFile[]) => void
}) {
  const [fileRejections, setFileRejections] = React.useState<FileRejection[]>(
    []
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    maxFiles,
    maxSize,
    minSize,
    multiple,
    onDropRejected: setFileRejections,
    onDrop: (acceptedFiles) => {
      setFileRejections([])

      const hasItem =
        isObjectInCollectionByProperty(acceptedFiles)(files)('name')

      if (!hasItem) {
        setFiles([
          ...(multiple ? files : []),
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              alt: '',
            })
          ),
        ])
      }

      // const acceptedFiles = [
      //   {
      //     path: 'sys..jpg',
      //     preview:
      //       'blob:http://localhost:3000/0fe02943-0922-4f66-a5ea-d49fc8022a2e',
      //     lastModified: 1710932691176,
      //     lastModifiedDate: new Date(
      //       'Wed Mar 20 2024 11:04:51 GMT+0000 (Greenwich Mean Time)'
      //     ),
      //     name: 'sys..jpg',
      //     size: 291052,
      //     type: 'image/jpeg',
      //     webkitRelativePath: '',
      //   },
      // ]
    },
  })

  const handleOnDescriptionChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateFiles = [...files]
      const file = updateFiles[index]

      file.alt = e.target.value
      updateFiles[index] = file

      setFiles(updateFiles)
    }

  const preview = (file: UploadFile) => {
    switch (type) {
      case 'image':
      case 'video':
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border">
            <img
              src={file.preview}
              className="h-full w-auto block rounded-md"
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          </div>
        )
      case 'audio':
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border p-2">
            <FileMusic className="w-10 h-10 text-muted-foreground" />
          </div>
        )
      default:
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border p-2">
            <File className="w-10 h-10 text-muted-foreground" />
          </div>
        )
    }
  }

  //TODO: double click to zoom in
  const thumbs = files.map((file, index) => {
    return (
      <li key={file.name} className="flex mb-2 items-top">
        <div className="relative w-14 h-16 translate-y-3">
          {preview(file)}
          <Button
            variant="outline"
            className="absolute p-0 rounded-full h-[26px] w-[26px] top-[-0.5rem] right-[-0.5rem]"
            onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
          >
            <CircleX />
          </Button>
        </div>

        <div className="ml-4 text-sm">
          <p className="max-w-52 truncate mb-1">{file.name}</p>
          <p className="mt-1 text-xs">Size {formatBytes(file.size)}</p>

          {type === 'image' || type === 'video' ? (
            <div className="mt-2">
              <Label className="mb-1" htmlFor={id}>
                Description
              </Label>
              <Input
                id={id}
                size="sm"
                value={(file as any)?.alt || ''}
                onChange={handleOnDescriptionChange(index)}
              />
            </div>
          ) : null}
        </div>
      </li>
    )
  })

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  // const errorMessage = (error as any)?.[0]?.errors[0]?.message.replace('/*', '') || null
  const errorMessage = !isEmpty(fileRejections)
    ? ` File must be of type ${type} and maximum size of ${formatBytes(
        maxSize
      )}kb`
    : null

  const accepts = Object.values(accept || {}).flat()

  return (
    <section>
      <p className="text-destructive mb-1">{errorMessage}</p>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className="grid grid-rows-2 items-center text-center justify-center border-2 rounded-md border-dashed p-4  ">
          <CloudUpload className="h-20 w-20 text-muted-foreground m-auto" />
          Drag 'n' drop {multiple ? 'some files' : 'a file'} here,
          <br /> or click to select {multiple ? 'files' : 'a file'}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-1 mb-2">
        {accepts ? accepts.join(', ') : null}
      </p>
      {thumbs.length > 0 ? (
        <aside className="mt-4">
          <ul className="flex flex-col gap-2">{thumbs}</ul>
        </aside>
      ) : null}
    </section>
  )
}
export type UploadFieldProps = Omit<CmsField<HTMLInputElement>, 'accept'> & {
  type: 'audio' | 'document' | 'image' | 'video'
  isMultiple?: boolean
  value: UploadFile[]
  onUpdate: (newValue: UploadFile[]) => void
  accept: Accept
}
export function UploadField({
  className,
  accept,
  fieldId,
  isInline,
  isMultiple = false,
  isSelected,
  type,
  value = [],
  validate,
  errorMessage,
  onUpdate,
}: UploadFieldProps) {
  const [files, setFiles] = React.useState(value)
  const [isOpen, setIsOpen] = React.useState(false)

  return isInline ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'min-w-48 flex align-star w-48 max-w-64 rounded-none border border-t-0 p-2 focus:border-white focus:bg-gray-900 cursor-text',
            isSelected && 'bg-gray-800',
            className
          )}
          value={files.map((f) => f.name)}
          onChange={() => {}}
        />
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80')}>
        <UploadTextField
          id={fieldId}
          type={type}
          multiple={isMultiple}
          files={files}
          accept={accept}
          setFiles={setFiles}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <UploadTextField
      id={fieldId}
      type={type}
      multiple={isMultiple}
      files={files}
      accept={accept}
      setFiles={setFiles}
    />
  )
}

export type UploadAudioFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: (' .mp3' | '.aac' | '.flac')[]
}

export function UploadAudioField({ accept, ...props }: UploadAudioFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="audio"
      accept={{
        'audio/*': accept || ['.mp3', '.aac', '.flac'],
      }}
    />
  )
}

export type UploadImageFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: ('.gif' | '.jpg' | '.jpeg' | '.png' | '.svg' | '.webp')[]
}

export function UploadImageField({ accept, ...props }: UploadImageFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="image"
      accept={{
        'image/*': accept || ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp'],
      }}
    />
  )
}

export type UploadVideoFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: ('mp4' | 'webm' | 'ogg')[]
}

export function UploadVideoField({ accept, ...props }: UploadVideoFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="video"
      accept={{
        'video/*': accept || ['mp4', 'webm', 'ogg'],
      }}
    />
  )
}

export type UploadOptionsProps = {
  onUpdate: (props: Omit<UploadOption, 'type'>) => void
} & UploadOption

export function UploadOptions({
  items = [],
  defaultValue,
  type,
  accept,
  onUpdate,
}: UploadOptionsProps) {
  const [filter, setFilter] = React.useState('')

  const options = Object.values(accept || [])
    .flat()
    .map((ext) => ({ id: ext, value: ext })) as AutocompleteCheckboxOption[]

  const handleOnUpdate = (key: string) => (value: TagInputItem[]) => {
    onUpdate &&
      onUpdate({
        defaultValue,
        items,
        [key]: value,
      })
  }

  const handleOnSelect = handleAutocompleteCheckboxOnSelect({
    options,
    selectedValues: items,
    onSelect: handleOnUpdate('acceptExtensions'),
  })

  return (
    <>
      <div className="mb-6">
        {type === 'image' ? (
          <>
            <Label htmlFor="defaultValue" className="flex mb-2">
              Default Value
            </Label>
            <GetFieldComponent
              id="defaultValue"
              type={type}
              value={defaultValue}
              onUpdate={handleOnUpdate('defaultValue')}
            />
          </>
        ) : null}
      </div>

      {type !== 'document' && type !== 'documents' ? (
        <div className="mb-6 grid gap-6">
          <Label htmlFor="acceptExtensions" className="flex">
            Accept Extensions
          </Label>

          <Button>Select all</Button>

          <AutocompleteCheckbox>
            <AutocompleteCheckboxInput
              filter={filter}
              setFilter={setFilter}
              placeholder="Filter"
            />
            <AutocompleteCheckboxContent>
              <AutocompleteCheckboxList
                filter={filter}
                options={options}
                selectedValues={items}
                onSelect={handleOnSelect}
              />
            </AutocompleteCheckboxContent>
          </AutocompleteCheckbox>
        </div>
      ) : (
        <div className="mb-6 grid gap-6">
          <Label htmlFor="defaultValue" className="flex mb-2">
            Accept Extensions
          </Label>
          <TagsInput className="flex items-center ">
            {items.map(({ id, value }) => {
              return (
                <TagItem
                  key={id}
                  id={id}
                  value={value}
                  onRemoveItem={(id: string) =>
                    onUpdate &&
                    onUpdate({
                      items: items.filter((item) => item.id !== id),
                    })
                  }
                />
              )
            })}
            <TagInput
              id="SelectedItems"
              placeholder="Items..."
              selectedItems={items}
              onUpdate={handleOnUpdate('items')}
            />
          </TagsInput>
        </div>
      )}
    </>
  )
}
