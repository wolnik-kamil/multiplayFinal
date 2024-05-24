
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const query = getQuery(event)
    const simcQuery = query.simc
    const streetQuery = query.search

    const getStreet = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/ulic/bysimc/${simcQuery}`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })
    return getStreet
})