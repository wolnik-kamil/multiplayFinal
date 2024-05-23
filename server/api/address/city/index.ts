

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const test123 = 'war'
    const address = await $fetch(`https://mms-demo.dev.multiplay.pl/api/address/teryt/simc/search?search=${test123}`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })
    return address
})