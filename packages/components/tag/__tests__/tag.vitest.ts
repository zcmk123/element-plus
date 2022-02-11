import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Tag from '../src/tag.vue'

const AXIOM = 'Rem is the best girl'

describe('Tag.vue', () => {
  it('render text & class', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)

    const vm = wrapper.vm

    expect(vm.$el.classList.contains('el-tag')).toEqual(true)
    expect(vm.$el.classList.contains('el-tag__close')).toEqual(false)
    expect(vm.$el.classList.contains('is-hit')).toEqual(false)
    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  it('type', () => {
    const wrapper = mount(Tag, {
      props: {
        type: 'info',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('el-tag--info')).toEqual(true)
  })

  it('hit', () => {
    const wrapper = mount(Tag, {
      props: {
        hit: true,
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('is-hit')).toEqual(true)
  })

  it('closable', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    })
    const closeBtn = wrapper.find('.el-tag .el-tag__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('closeTransition', () => {
    const wrapper = mount(Tag, {
      props: {
        closeTransition: true,
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  it('color', () => {
    const wrapper = mount(Tag, {
      props: {
        color: 'rgb(0, 0, 0)',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  })

  it('theme', () => {
    const wrapper = mount(Tag, {
      props: {
        effect: 'dark',
      },
    })
    const vm = wrapper.vm
    const el = vm.$el
    expect(el.className.includes('el-tag--dark')).toEqual(true)
    expect(el.className.includes('el-tag--light')).toEqual(false)
    expect(el.className.includes('el-tag--plain')).toEqual(false)
  })

  // should also support large size
  it('size', () => {
    const wrapper = mount(Tag, {
      props: {
        size: 'large',
      },
    })
    const vm = wrapper.vm
    const el = vm.$el
    expect(el.className.includes('el-tag--large')).toEqual(true)
    expect(el.className.includes('el-tag--default')).toEqual(false)
    expect(el.className.includes('el-tag--small')).toEqual(false)
  })
})
