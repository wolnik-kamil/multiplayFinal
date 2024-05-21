
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)


    const address = await $fetch(`https://mms-development.dev.multiplay.pl/api/address/teryt/simc/search?search=Opole&woj_id=16`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })

    return address
})