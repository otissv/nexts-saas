"use client"

import { useDrop } from "react-dnd"
import { NativeTypes } from "react-dnd-html5-backend"

import { Typography } from "@/components/typography/typography"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DndImg = ({ className, alt, src, ...props }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (onDrop) {
          onDrop(item)
        }
      },
      canDrop(item) {
        console.log("canDrop", item.files, item.items)
        return true
      },
      hover(item) {
        console.log("hover", item.files, item.items)
      },
      collect: (monitor) => {
        const item = monitor.getItem()
        if (item) {
          // console.log("collect", item.files, item.items)
        }
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [props]
  )
  //   const isActive = canDrop && isOver

  return (
    <div className={className}>
      {src ? (
        <Image src={src} alt={alt} {...props} />
      ) : (
        <div
          ref={drop}
          style={{
            width: "100%",
            height: "inherit",
            backgroundColor: "#ffffff",
            opacity: 0.5,
            backgroundSize: "10px 10px",
            border: "solid 1px #c4c4c4",
            backgroundImage:
              "repeating-linear-gradient(45deg, #c4c4c4 0, #c4c4c4 1px, #ffffff 0, #ffffff 50%)",
          }}
          {...props}
        />
      )}
    </div>
  )
}

const Hero1 = ({
  isEdit,
  className,
  heading,
  lead,
  cta,
  image,
  id,
  ...props
}) => {
  return (
    <header
      className={cn(
        "relative w-full h-[600px] grid grid-col-1 grid-row-2 md:grid-cols-2",
        className
      )}
      {...props}
    >
      <DndImg
        className="h-full md:h-[600px]"
        {...image}
        data-editor={`${id}-image`}
      />
      <div className="flex flex-col justify-center p-8">
        <Typography
          data-editor={`${id}-heading`}
          as="h1"
          className="mb-4"
          contentEditable={isEdit}
          suppressContentEditableWarning
          {...heading}
        />
        <Typography
          data-editor={`${id}-lead`}
          as="p"
          className="mb-4"
          contentEditable={isEdit}
          suppressContentEditableWarning
          {...lead}
        />
        <Button
          data-editor={`${id}-cta`}
          className={cn("mb-4", isEdit && "cursor-text")}
          suppressContentEditableWarning
          contentEditable={isEdit}
          {...cta}
        />
        <br />
      </div>
    </header>
  )
}

export default Hero1
