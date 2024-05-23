//
// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig(event)
//
//
//     const address = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/simc/search?search=kat`, {
//         headers: {
//             Authorization: `token ${config.mmsToken}`
//         }
//     })
//     return address
// })