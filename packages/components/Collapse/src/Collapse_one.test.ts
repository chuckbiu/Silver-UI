import { describe } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Collapse from '../src/Collapse.vue'
import CollapseItem from '../src/CollapseItem.vue'

describe('collapse vue', () => {
  it('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a'],
      },
      slots: {
        default: h(CollapseItem, { name: 'a', title: 'Title A' }, 'content a'),
      },
      global: {
        stubs: ['Icon'],
      },
    })
    console.log(wrapper.html())
  })
})
