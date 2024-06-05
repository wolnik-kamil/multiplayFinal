import { defineStore } from 'pinia'

export const useClientDataStore = defineStore('clientData', {
    state: () => ({
        clientData: {} as ClientDataI | null,
    }),
    actions: {
        setData(data: ClientDataI) {
            this.clientData = data
        },
    }
})