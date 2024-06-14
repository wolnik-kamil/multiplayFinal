import {describe, expect, it} from "vitest";
import {AddressForm} from "#components";
import {mount, VueWrapper} from "@vue/test-utils";
import {Multiselect} from "vue-multiselect";
import {mountSuspended} from "@nuxt/test-utils/runtime";


describe('inputs validation test', () => {
    test('zip code should be set like that: xx-xxx', async ()=> {
        const wrapper = mount(AddressForm)
        const inputField = wrapper.find<HTMLInputElement>('[data-test="input-zipCode"]');
        await inputField.setValue('12asdsdjak123');
        expect(inputField.element.value).toMatch('12-123');
    })
    test('multiselects are matching with snapshot', async () => {
        const wrapper = mountSuspended(AddressForm)
        const multiselect = (await wrapper).findComponent('[data-test="input-city"]')
        await multiselect.setValue('Knurów')
        console.log(multiselect.element)
    })

})