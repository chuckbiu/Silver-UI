import { describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'
import Button from './Button.vue'

describe('button.vue', () => {
  it('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
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
  it('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })
    // attributres
    expect(wrapper.attributes('disabled')).toBeDefined()
    // 原生节点
    expect(wrapper.find('button').element.disabled).toBeDefined()
  })
  it('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'], // 该配置可以忽略第三方库
      },
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading',
      },
      global: {
        stubs: ['Icon'], // 该配置可以忽略第三方库
      },
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('fa-solid fa-spinner')
    expect(wrapper.attributes('disabled')).toBeDefined() // 是否存在
  })
})
