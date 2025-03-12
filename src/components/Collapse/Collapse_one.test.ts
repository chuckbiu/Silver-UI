import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Collapse from './Collapse.vue'
import { h, defineComponent, ref } from 'vue'
import CollapseItem from "./CollapseItem.vue";

describe('Collapse vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
        props: {
            modelValue: ['a']
        },
        slots: {
            default: h(CollapseItem, {name: 'a', title: 'Title A'}, 'content a')
        },
        global: {
            stubs: ['Icon']
        }
    })
    console.log(wrapper.html())
  })
})
