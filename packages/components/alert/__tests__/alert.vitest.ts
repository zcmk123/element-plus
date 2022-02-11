import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { TypeComponentsMap } from '@element-plus/utils'
import Alert from '../src/alert.vue'

const AXIOM = 'Rem is the best girl'

describe('Alert.vue', () => {
  it('render test & class', () => {
    const wrapper = mount(Alert, {
      props: {
        title: AXIOM,
        showIcon: true,
      },
    })
    expect(wrapper.find('.el-alert__title').text()).toEqual(AXIOM)
    expect(wrapper.find('.el-alert').classes()).toContain('el-alert--info')
  })

  it('type', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test',
        type: 'success',
        showIcon: true,
      },
    })
    expect(wrapper.find('.el-alert').classes()).toContain('el-alert--success')
    expect(wrapper.find('.el-alert__icon').classes()).toContain('el-icon')
    expect(wrapper.findComponent(TypeComponentsMap.success).exists()).toBe(true)
  })

  it('description', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Dorne',
        description: AXIOM,
        showIcon: true,
      },
    })
    expect(wrapper.find('.el-alert__description').text()).toEqual(AXIOM)
  })

  it('theme', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test',
        effect: 'dark',
      },
    })
    expect(wrapper.find('.el-alert').classes()).toContain('is-dark')
  })

  it('title slot', () => {
    const wrapper = mount(Alert, {
      slots: {
        title: AXIOM,
      },
    })
    expect(wrapper.find('.el-alert__title').text()).toEqual(AXIOM)
  })

  it('close', async () => {
    const wrapper = mount(Alert, {
      props: {
        closeText: 'close',
      },
    })

    const closeBtn = wrapper.find('.el-alert__close-btn')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
