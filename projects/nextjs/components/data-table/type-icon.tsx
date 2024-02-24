import {
  Calendar,
  Clock4,
  File,
  FileType,
  Hash,
  Image,
  Link,
  MapPin,
  Replace,
  ReplaceAll,
  ScrollText,
  ToggleLeft,
  Type,
  Video,
  Volume1,
} from 'lucide-react'

export function TypeIcon({ type, ...props }: { type: string }) {
  const icon = {
    'multi-reference': (
      <ReplaceAll className="h-3 text-muted-foreground mr-1" {...props} />
    ),
    'rich-content': (
      <ScrollText className="h-3 text-muted-foreground mr-1" {...props} />
    ),
    'rich-text': (
      <FileType className="h-3 text-muted-foreground mr-1" {...props} />
    ),
    address: <MapPin className="h-3 text-muted-foreground mr-1" {...props} />,
    audio: <Volume1 className="h-3 text-muted-foreground mr-1" {...props} />,
    boolean: (
      <ToggleLeft className="h-3 text-muted-foreground mr-1" {...props} />
    ),
    date: <Calendar className="h-3 text-muted-foreground mr-1" {...props} />,
    documents: <File className="h-3 text-muted-foreground mr-1" {...props} />,
    image: <Image className="h-3 text-muted-foreground mr-1" {...props} />,
    number: <Hash className="h-3 text-muted-foreground mr-1" {...props} />,
    reference: (
      <Replace className="h-3 text-muted-foreground mr-1" {...props} />
    ),
    text: <Type className="h-3 text-muted-foreground mr-1" {...props} />,
    time: <Clock4 />,
    url: <Link className="h-3 text-muted-foreground mr-1" {...props} />,
    video: <Video className="h-3 text-muted-foreground mr-1" {...props} />,
  }[type]

  return icon || null
}
