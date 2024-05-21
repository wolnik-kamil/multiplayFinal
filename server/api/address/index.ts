
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const address = await $fetch(`https://mms-development.dev.multiplay.pl/api/address/teryt/simc/search?search=knu &woj_id=24`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })

    return address
})