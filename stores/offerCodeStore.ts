import { defineStore } from 'pinia'

export const useOfferCodeStore = defineStore('offerCodeStore', {
    state: () => ({
        generatedCode: {} as string | null,
    }),
    actions: {
        setOfferCode(code: string) {
            this.generatedCode = code
        },

    }
})