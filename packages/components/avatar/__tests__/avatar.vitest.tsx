import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { User } from '@element-plus/icons-vue'
import {
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  mockImageEvent,
} from '@element-plus/test-utils'

import Avatar from '../src/avatar.vue'

describe('Avatar.vue', () => {
  mockImageEvent()

  it('render test', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.el-avatar').exists()).toBe(true)
  })

  it('size is number', () => {
    const wrapper = mount(() => <Avatar size={50} />)
    expect(wrapper.attributes('style')).toMatchInlineSnapshot(
      '"--el-avatar-size: 50px;"'
    )
  })

  it('size is string', () => {
    const wrapper = mount(() => <Avatar size="small" />)
    expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "el-avatar",
        "el-avatar--small",
        "el-avatar--circle",
      ]
    `)
  })

  it('shape', () => {
    const wrapper = mount(() => <Avatar size="small" shape="square" />)
    expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "el-avatar",
        "el-avatar--small",
        "el-avatar--square",
      ]
    `)
  })

  it('icon avatar', () => {
    const wrapper = mount(() => <Avatar icon={User} />)
    expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "el-avatar",
        "el-avatar--default",
        "el-avatar--icon",
        "el-avatar--circle",
      ]
    `)
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('image avatar', () => {
    const wrapper = mount(() => <Avatar src={IMAGE_SUCCESS} />)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('image fallback', async () => {
    const wrapper = mount(Avatar, {
      props: { src: IMAGE_FAIL },
      slots: { default: 'fallback' },
    })
    await nextTick()
    expect(wrapper.emitted('error')?.length).toBe(1)
    await nextTick()
    expect(wrapper.text()).toMatchInlineSnapshot('"fallback"')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('image fit', () => {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
    for (const fit of fits) {
      const wrapper = mount(() => <Avatar fit={fit} src={IMAGE_SUCCESS} />)
      expect(wrapper.find('img').attributes('style')).toBe(
        `object-fit: ${fit};`
      )
    }
  })

  it('src changed', async () => {
    const wrapper = mount(Avatar, {
      slots: { default: 'fallback' },
    })
    expect(wrapper.vm.hasLoadError).toBe(false)
    await wrapper.setProps({ src: IMAGE_FAIL })
    // wait error event trigger
    await nextTick()
    expect(wrapper.vm.hasLoadError).toBe(true)
    await wrapper.setProps({ src: IMAGE_SUCCESS })
    expect(wrapper.vm.hasLoadError).toBe(false)
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
