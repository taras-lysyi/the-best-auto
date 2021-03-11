import axios from 'axios'
export const categoryUp = async ({ categoryId }: { categoryId: number }) => {
  await axios.post(
    `/admin/menu/up`,
    JSON.stringify({
      categoryId,
    }),
  )
}
