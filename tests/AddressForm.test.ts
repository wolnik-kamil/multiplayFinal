import {describe, expect} from "vitest";
import {AddressForm} from "#components";
import {mount} from "@vue/test-utils";
import type {VueElement} from "vue";
import {Multiselect} from "vue-multiselect";


describe('inputs validation test', () => {
    test('zip code should be set like that: xx-xxx', async ()=> {
        const wrapper = mount(AddressForm)
        const inputField = wrapper.find<HTMLInputElement>('[data-test="input-zipCode"]');
        await inputField.setValue('12asdsdjak123');
        expect(inputField.element.value).toMatch('12-123');
    })
    test('typing in multiselect should refresh value of variable', async ()=> {
        const wrapper = mount(AddressForm)
        const multiselect = wrapper.findAllComponents(Multiselect)
        const select1 = multiselect[0].vm
        const select2 = multiselect[1].vm
        select1.$options.value = 'orna'
        select2.$options.value = 'kolejowa'
        console.log(select1.$select)
        expect(select1.$options.value == "orna" && select2.$options.value == "kolejowa")
    })
})