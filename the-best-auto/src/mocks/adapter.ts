import { AxiosAdapter, AxiosResponse } from 'axios'
import db from './db.json'

// In-browser stand-in for the original Node API: same endpoints, same response envelope,
// backed by a JSON snapshot of real listings. Enabled when REACT_APP_API_URL is empty.

type Product = typeof db.products[number]
type Range = { start?: number; end?: number }
type Filters = {
  brand?: number[]
  isnew?: 0 | 1
  popular?: 0 | 1
  sale?: 0 | 1
  price?: Range
  mileage?: Range
  [featureId: string]: unknown // "1": ["Чорний", "Білий"]
}

const inRange = (value: number, range?: Range) =>
  (!range?.start || value >= range.start) && (!range?.end || value <= range.end)

const applyFilters = (items: Product[], filters: Filters) =>
  items.filter(p => {
    if (filters.brand?.length && !filters.brand.includes(p.brand_id)) return false
    if (filters.isnew && !p.new) return false
    if (filters.popular && !p.popular) return false
    if (filters.sale && !p.sale) return false
    if (!inRange(p.price, filters.price) || !inRange(p.mileage, filters.mileage)) return false
    return Object.entries(filters).every(([key, values]) => {
      const featureId = Number(key)
      if (!featureId || !Array.isArray(values) || values.length === 0) return true
      return p.feature.some(f => f.feature_id === featureId && values.includes(f.feature_value))
    })
  })

const slider = (nums: number[]) =>
  nums.length ? { min: Math.min(...nums), max: Math.max(...nums), start: 0, end: 0 } : { min: 0, max: 0, start: 0, end: 0 }

const ok = (result: unknown) => ({ status: true, result })
const none = () => ({ status: false, result: null })

const demoUser = {
  user_id: 1,
  name: 'Demo Admin',
  delivery: null,
  city: null,
  email: 'demo@example.com',
  gender: 0,
  phone: '',
  phone_verify: 1,
  token: 'demo-token',
}

const crmProduct = (p: Product) => ({ ...p, note: '', variant: [], date_active: null, time_active: null, user: demoUser })

const office = {
  city: 'Рівне',
  description: 'Офіс',
  office: 1,
  name: 'The Best Auto',
  phone: '067 670 33 22',
  geo: '50.6199,26.2516',
}

type Handler = (body: any, headers: Record<string, unknown>) => { status: boolean; result: unknown }

const routes: Record<string, Handler> = {
  // Demo auth: any email + password signs in; the token unlocks the CRM screens.
  'users/verify': (_, headers) => (headers.Authorization ? ok(demoUser) : none()),
  'users/authenticate': body => (body.email && body.password ? ok(demoUser) : none()),
  'users/register': body => (body.email && body.password ? ok(demoUser) : none()),
  'category/all': () => ok(db.categories),
  'category/getStructure': () => ok(db.categories),
  'brands/all': () => ok(db.brands),
  'features/all': () => ok(db.features),
  'features/value': () => ok(db.featureValues),
  'catalog/items': body => {
    const ids = (body.itemIds as string[]).map(Number)
    return ok(db.products.filter(p => ids.includes(p.item_id)))
  },
  'catalog/byCategoryIds': body => {
    const items = db.products.filter(p => (body.categoryIds as number[]).includes(p.category_id))
    const itemsByCat = applyFilters(items, body.filters ?? {})
    return ok({
      items,
      itemsByCat,
      limit: 100,
      offset: 0,
      total: itemsByCat.length,
      sql: null,
      price: slider(items.map(p => p.price)),
      mileage: slider(items.map(p => p.mileage)),
    })
  },
  'catalog/itemsCRM': body => {
    const ids = (body.itemIds as string[]).map(Number)
    return ok(db.products.filter(p => ids.includes(p.item_id)).map(crmProduct))
  },
  'product/getFiles': body => {
    const p = db.products.find(x => x.item_id === Number(body.itemId))
    return ok(p ? p.images.split(',').map(n => `${n}.jpg`) : [])
  },
  // Writes are accepted but not persisted: the snapshot resets on reload.
  'product/addCRM': () => ok(true),
  'product/editCRM': () => ok(true),
  'product/deleteCRM': () => ok(true),
  'product/upload': () => ok([]),
  'product/removeFiles': () => ok([]),
  'product/uploadCarFax': () => ok([]),
  'product/removeCarFax': none,
  'features/add': () => ok(true),
  'features/value/add': () => ok(true),
  'product/getCarFax': none,
  'settings/get': () => ok(null),
  'team/get': () => ok([]),
  'contacts/map/getMapLocations': () => ok([office]),
  'contacts/map/addMapLocation': () => ok(true),
}

export const mockAdapter: AxiosAdapter = config => {
  const path = (config.url ?? '').replace(/^\//, '')
  const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data ?? {}
  const handler = routes[path]
  const payload = handler ? handler(body, (config.headers ?? {}) as Record<string, unknown>) : { ...none(), error: `no mock for ${path}` }
  const response: AxiosResponse = {
    data: { error: '', server_time: Date.now(), ...payload },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  }
  return new Promise(resolve => setTimeout(() => resolve(response), 150))
}
