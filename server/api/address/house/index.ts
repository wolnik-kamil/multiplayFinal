export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const query = getQuery(event)
    const selectedHouseNumber = query.houseNumber
    const ulic = query.ulic
    const simc = query.simc
    const terc = query.terc

    const getHouse = await $fetch(`https://mms-demo.dev.multiplay.pl/api/qgis/passporting/addresses/find?wantsForms=true&terc=${terc}&simc=${simc}&ulic=${ulic}&number=${selectedHouseNumber}`, {
        headers: {
            Authorization: `token ${config.mmsToken}`
        }
    })
    return getHouse
})
