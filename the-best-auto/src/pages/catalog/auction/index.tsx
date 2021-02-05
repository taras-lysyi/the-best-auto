// function getBrands() {
//   let _brands
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   }

//   return (_brands = fetch(`https://the-best-auto.com:4206/brands/all`, requestOptions)
//     .then(handleResponse)
//     .then(sorting))
// }

// function handleResponse(response: any) {
//   return response.text().then((text: any) => {
//     const data = text && JSON.parse(text)
//     if (!data.status) {
//       if (response.status === 401) {
//         window.location.reload(true)
//       }

//       const error = (data && data.error) || response.statusText
//       return Promise.reject(error)
//     }

//     return data.result
//   })
// }

// function sorting(response: any) {
//   return response.sort(function (a: any, b: any) {
//     return a.sort - b.sort
//   })
// }
export const CatalogAuction = () => {
  // let brands = getBrands()
  // console.log(brands)
  return <div>catalog auction</div>
}
