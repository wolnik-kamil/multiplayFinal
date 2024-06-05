interface GeneralConnectionConditionsI {
    connection_conditions: string,
    sale_internet_max_speed: number,
    sale_iptv_access: string,
    connection_extra_payment: string,
    substructure_monthly_payment: string,
    connection_days_needed: number,
    address_pna: string
}
interface ClientDataI {
    clientData: {
        client_name: string,
        client_surname: string,
        client_phone_number: string,
        client_uid: string,
    },
}