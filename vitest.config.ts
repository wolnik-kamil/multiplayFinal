import {defineVitestConfig} from "@nuxt/test-utils/config";

export default defineVitestConfig({
    test: {
        environment: 'nuxt', // jesli mamy inne testy nie deklarujemy tego tutaj!!
        globals: true,
    }
})