import { AxiosResponse, AxiosError } from 'axios'
import { instance } from 'serverConfig'

const handleError = () => window.location.reload()

type GetAllT = {
  active: number
  caterogy_id: number
  link: string // available
  main: number
  name: string // Авто в наявності
  name_once: null
  parent_id: null
  second: number
  sort: number
}

export const getAll = (): Promise<GetAllT[] | void> =>
  instance
    .post('/category/all')
    .then(response => console.log(response.data.result.filter((item: GetAllT) => item.main)))
    .catch(handleError)

// let _categoryMain: [] | Promise<any> = []

// function getMain() {
//     return getAll().then((category: GetAllT[] | void) => {
//       return category.filter(item => item.main)
//     })
// }

// function getMain(flush = false) {
//   if (flush || _categoryMain.length === 0) {
//     return (_categoryMain = new Promise(resolve => {
//       getAll().then(category => {
//         return resolve(category.filter(item => item.main))
//       })
//     }))
//   } else {
//     return _categoryMain
//   }
// }
