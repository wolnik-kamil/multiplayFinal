export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    //query -> {search: 'letters'
    const query = getQuery(event)
    const cityQuery = query.search

    const getCity = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/simc/search?search=${cityQuery}`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })
    return getCity
})