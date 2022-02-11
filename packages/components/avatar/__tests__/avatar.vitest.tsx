import { markRaw, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, it, expect, fn, vi, beforeEach, afterEach } from 'vitest'
import { User } from '@element-plus/icons-vue'
import {
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  mockImageEvent,
} from '@element-plus/test-utils'

import Avatar from '../src/avatar.vue'
import type { AvatarProps } from '../src/avatar'

const warnHandler = fn()
const _mount = (options: MountingOptions<Partial<AvatarProps>> = {}) =>
  mount(Avatar, {
    ...options,
    global: { config: { warnHandler } },
  })

describe('Avatar.vue', () => {
  mockImageEvent()

  const warn = vi.spyOn(console, 'warn')
  beforeEach(() => {
    warn.mockImplementation(() => undefined)
  })

  afterEach(() => {
    warn.mockRestore()
  })

  it('render test', () => {
    const wrapper = _mount()
    expect(wrapper.find('.el-avatar').exists()).toBe(true)
  })

  it('size is number', () => {
    const wrapper = _mount({
      props: { size: 50 },
    })
    expect(wrapper.attributes('style')).toContain('--el-avatar-size: 50px;')
  })

  it('size is string', () => {
    const wrapper = _mount({
      props: { size: 'small' },
    })
    expect(wrapper.classes()).toContain('el-avatar--small')
  })

  it('shape', () => {
    const wrapper = _mount({
      props: { size: 'small', shape: 'square' },
    })
    expect(wrapper.classes()).toContain('el-avatar--square')
  })

  it('icon avatar', () => {
    const wrapper = _mount({
      props: { icon: markRaw(User) },
    })
    expect(wrapper.classes()).toContain('el-avatar--icon')
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('image avatar', () => {
    const wrapper = _mount({
      props: { src: IMAGE_SUCCESS },
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('image fallback', async () => {
    const wrapper = _mount({
      props: { src: IMAGE_FAIL },
      slots: { default: 'fallback' },
    })
    await nextTick()
    expect(wrapper.emitted('error')).toBeDefined()
    await nextTick()
    expect(wrapper.text()).toBe('fallback')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('image fit', () => {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
    for (const fit of fits) {
      const wrapper = _mount({
        props: { fit, src: IMAGE_SUCCESS },
      })
      expect(wrapper.find('img').attributes('style')).toContain(
        `object-fit: ${fit};`
      )
    }
  })

  it('src changed', async () => {
    const wrapper = _mount({
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
