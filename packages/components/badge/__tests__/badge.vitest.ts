import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Badge from '../src/badge.vue'

const AXIOM = 'Rem is the best girl'

describe('Badge', () => {
  it('has value', () => {
    const wrapper = mount(Badge, {
      props: { value: 80 },
    })
    expect(wrapper.vm.content).toMatchInlineSnapshot('"80"')
  })

  it('is fixed', () => {
    const wrapper = mount(Badge, {
      slots: { default: AXIOM },
    })
    expect(wrapper.find('.el-badge__content.is-fixed').exists()).toBe(true)
  })

  it('is dot', () => {
    const wrapper = mount(Badge, {
      props: { isDot: true },
      slots: { default: AXIOM },
    })
    expect(wrapper.find('.el-badge__content.is-dot').exists()).toBe(true)
    expect(
      wrapper.find('.el-badge__content.el-badge__content--danger').exists()
    ).toBe(true)
  })

  it('is dot with type', () => {
    const wrapper = mount(Badge, {
      props: { isDot: true, type: 'success' },
      slots: { default: AXIOM },
    })
    expect(wrapper.find('.el-badge__content.is-dot').exists()).toBe(true)
    expect(
      wrapper.find('.el-badge__content.el-badge__content--success').exists()
    ).toBe(true)
  })

  it('max', async () => {
    const wrapper = mount(Badge, {
      props: { max: 100, value: 200 },
    })
    expect(wrapper.vm.content).toMatchInlineSnapshot('"100+"')
    await wrapper.setProps({ value: 80 })
    expect(wrapper.vm.content).toMatchInlineSnapshot('"80"')
  })
})
