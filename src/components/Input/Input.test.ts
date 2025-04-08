import { describe, expect, it } from "vitest";
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    /**
     *  针对动态class 查看 classes 是否正确
     *  针对 v-if 是否渲染正确的标签 以及内容
     *  针对 slots 是否渲染对于的slots内容
     */
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        tyep: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('si-input--small');
    expect(wrapper.classes()).toContain('is-prepend')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.si-input__prepend').exists()).toBeTruthy()
    expect(wrapper.find('.si-input__prefix').exists()).toBeTruthy()
    // test textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''

      }
    })
    console.log(wrapper2.html())

    // expect(wrapper.classes()).toContain('si-textarea__wrappper')
      expect(wrapper2.find('.si-textarea__wrappper').exists()).toBeTruthy()

  })
  it('支持 v-model', async () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: 'test',
          'onUpdate:modelValue': (e: string) => wrapper.setProps({
            modelValue: e
          })
        }
      })
      // 初始值
      const input = wrapper.get('input');
      expect(input.element.value).toBe('test')
      // 更新值
      await input.setValue('update')
      expect(wrapper.props('modelValue')).toBe('update')
      expect(input.element.value).toBe('update')
      /**
       * 测试事件
       */
      console.log('the events', wrapper.emitted())
      expect(wrapper.emitted()).toHaveProperty('input')
      expect(wrapper.emitted()).toHaveProperty('change')
      // [['update'], ...]
      const inputEvent = wrapper.emitted('input')
      const changeEvent = wrapper.emitted('change')
      expect(inputEvent![0]).toEqual(['update'])
      expect(changeEvent![0]).toEqual(['update'])

      // v-model 异步更新
      await wrapper.setProps({
        modelValue: 'prop update'
      })
      expect(input.element.value).toBe('prop update')

  })
  //  it.only
  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input,  {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对于的Icon区域
    expect(wrapper.find('.si-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    // focus 事件
    expect(wrapper.emitted()).toHaveProperty('focus')

    // 出现icon区域
    expect(wrapper.find('.si-input__clear').exists()).toBeTruthy()
    // 点击值变为空且消失
    await wrapper.get('.si-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    // 点击值变为空且消失 特别注意这里不仅仅会触发clear 事件，对应的 Input 以及 change 应该都会被调用
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')

  })
  // it.only('支持密码是否显示', async () => {
  //   const wrapper = mount(Input,  {
  //     props: {
  //       modelValue: '',
  //       showPassword: true,
  //       type: 'text'
  //     },
  //     global: {
  //       stubs: ['Icon']
  //     }
  //   })
  //   // 不出现对于的Icon区域, 因为当前值为空
  //   expect(wrapper.find('.si-input__password').exists()).toBeFalsy()
  //   const input = wrapper.get('input')
  //   expect(input.element.type).toBe('password')
  //   // 出现icon区域, 并且Icon图标为特点的图标
  //   await input.setValue('update')
  //   expect(wrapper.find('.si-input__password').exists()).toBeTruthy()
  //   expect(wrapper.find('.si-input__password').attributes('icon')).toBe('eye-slash')

  //   // 点击 icon 会切换 icon 类型， 并且input 类型也切换
  //   await wrapper.find('.si-input__password').trigger('click')
  //   expect(wrapper.get('input').element.type).toBe('text')
  //   expect(wrapper.find('.si-input__password').attributes('icon')).toBe('eye')

  // })
})

