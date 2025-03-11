import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button.vue', () => {
    test('basic button', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'primary'
            },
            slots: {
                default: 'button'
            }
        })
        console.log(wrapper.html())
        expect(wrapper.classes()).toContain('si-button--primary')
        // slot 
        // get, find
        expect(wrapper.get('button').text()).toBe('button')
        wrapper.get('button').trigger('click') // 点击事件触发
        console.log(wrapper.emitted())
        expect(wrapper.emitted()).toHaveProperty('click')
    })
    test('disabled', () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true
            },
            slots: {
                default: 'disabled'
            }
        })
        // attributres
        expect(wrapper.attributes('disabled')).toBeDefined()
        // 原生节点
        expect(wrapper.find('button').element.disabled).toBeDefined()
    })
})