import { selectCmsCollectionsAction } from '@/features/cms/cms.actions'
import { NextResponse, NextRequest } from 'next/server'

const getCollectionReference = async (req: NextRequest) => {
  let param = req.nextUrl.searchParams.get('columns')

  let result
  try {
    if (param) {
      const columns = JSON.parse(param)

      result = await selectCmsCollectionsAction({
        columns,
      } as any)

      result = {
        ...result,
        data: result.data.map(({ collectionName, id, ...props }) => ({
          ...props,
          id: `${id}`,
          value: collectionName,
        })),
      }
    } else {
    }
  } catch (_error) {
    result = await selectCmsCollectionsAction()
  }
  return NextResponse.json(result)
}

export { getCollectionReference as GET }
