import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connectionStore', {
    state: () => ({
        connectionConditions: {} as GeneralConnectionConditionsI | null,
    }),
    actions: {
        setConnectionConditions(conditions: GeneralConnectionConditionsI) {
            this.connectionConditions = conditions
        },

    }
})