import { createCategoryPage } from '@/actions'
import { SelectCategory } from './SelectCategory'
import { BottomBar } from './BottomBar'

export const FormCategory= ({homeId}: {homeId: string}) => {
  return (
    <form action={createCategoryPage}>
        <input type="hidden" name='homeId' value={homeId} />
        <SelectCategory />
        <BottomBar />
    </form>
  )
}
