import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connectionStore', {
    state: () => ({
        connectionStatus: '',
        connectionConditions: {} as GeneralConnectionConditionsI | null,
    }),
    actions: {
        setConnectionStatus(status: string) {
            this.connectionStatus = status
        },
        setConnectionConditions(conditions: GeneralConnectionConditionsI) {
            this.connectionConditions = conditions
        }
    }
})