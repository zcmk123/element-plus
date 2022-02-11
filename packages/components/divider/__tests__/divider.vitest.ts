import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Divider from '../src/divider.vue'

const AXIOM = 'Rem is the best girl'

describe('Divider.vue', () => {
  it('render test', () => {
    const wrapper = mount(Divider, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toBe(AXIOM)
  })

  it('direction', () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'vertical',
      },
    })
    expect(wrapper.classes()).toContain('el-divider--vertical')
  })

  it('contentPosition', () => {
    const wrapper = mount(Divider, {
      slots: {
        default: AXIOM,
      },
      props: {
        contentPosition: 'right',
      },
    })
    expect(wrapper.find('.el-divider__text').classes()).toContain('is-right')
  })

  it('customClass', () => {
    const wrapper = mount(Divider, {
      props: {
        class: 'customClass',
      },
    })
    expect(wrapper.classes()).toContain('customClass')
  })

  it('line-dashed', () => {
    const wrapper = mount(Divider, {
      props: {
        borderStyle: 'dashed',
      },
    })
    expect(
      getComputedStyle(wrapper.element, null).getPropertyValue(
        '--el-border-style'
      )
    ).toBe('dashed')
  })

  it('line-solid', () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'vertical',
      },
    })
    expect(
      getComputedStyle(wrapper.element, null).getPropertyValue(
        '--el-border-style'
      )
    ).toBe('solid')
  })
})
