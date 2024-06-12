import {describe, expect} from "vitest";
import {AddressForm} from "#components";
import {mount} from "@vue/test-utils";

describe('inputs validation test', () => {
    test('zip code should be set like that: xx-xxx', async ()=> {
        const wrapper = mount(AddressForm)
        const inputField = wrapper.find<HTMLInputElement>('[data-test="input-zipCode"]');
        await inputField.setValue('12asdsdjak123')
        console.log(inputField.element.value)
        expect(inputField.element.value).toMatch("12-123")
    })
})