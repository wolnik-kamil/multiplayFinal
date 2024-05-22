
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)


    const address = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/simc/search?search=gliwice&woj_id=24`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })

    return address
})