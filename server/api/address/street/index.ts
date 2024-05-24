import city from "~/server/api/address/city";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const query = getQuery(event)
    const simcQuery = query.simc
    const streetQuery = query.search
    console.log(simcQuery)

    const address = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/ulic/bysimc/${simcQuery}`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })
    return address
})