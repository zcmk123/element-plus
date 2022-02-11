import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { NOOP } from '@vue/shared'
import { describe, it, expect, vi, beforeEach, afterEach, fn } from 'vitest'
import { POPPER_CONTAINER_SELECTOR } from '@element-plus/hooks'
import { debugWarn } from '@element-plus/utils'
import Autocomplete from '../src/index.vue'

vi.mock('@element-plus/utils/error', async () => ({
  ...vi.importActual('@element-plus/utils/error'),
  debugWarn: fn(),
}))

const _mount = (payload: Record<string, any> = {}) => {
  const state = ref('')
  const list = [
    { value: 'Java', tag: 'java' },
    { value: 'Go', tag: 'go' },
    { value: 'JavaScript', tag: 'javascript' },
    { value: 'Python', tag: 'python' },
  ]
  const querySearch = (queryString: string, cb: (data: any[]) => void) => {
    if (!queryString) cb(list)
    cb(
      list.filter((i) =>
        i.value.toLowerCase().startsWith(queryString.toLowerCase())
      )
    )
  }
  return {
    wrapper: mount({
      setup: () => () =>
        (
          <Autocomplete
            ref="autocomplete"
            v-model={state.value}
            fetchSuggestions={querySearch}
            {...payload}
          />
        ),
    }),
    state,
  }
}
describe('Autocomplete.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('placeholder', async () => {
    const { wrapper } = _mount()
    await nextTick()

    await wrapper.setProps({ placeholder: 'autocomplete' })
    expect(wrapper.find('input').attributes('placeholder')).toBe('autocomplete')

    await wrapper.setProps({ placeholder: 'placeholder' })
    expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder')
  })

  it('triggerOnFocus', async () => {
    const fetchSuggestions = fn()
    const { wrapper } = _mount({
      debounce: 10,
      fetchSuggestions,
    })
    await nextTick()

    await wrapper.setProps({ triggerOnFocus: false })
    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()
    expect(fetchSuggestions).toHaveBeenCalledTimes(0)

    await wrapper.find('input').trigger('blur')

    await wrapper.setProps({ triggerOnFocus: true })
    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()
    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
  })

  it('popperClass', async () => {
    const { wrapper } = _mount()
    await nextTick()

    await wrapper.setProps({ popperClass: 'error' })
    expect(
      document.body.querySelector('.el-popper')!.classList.contains('error')
    ).toBe(true)

    await wrapper.setProps({ popperClass: 'success' })
    expect(
      document.body.querySelector('.el-popper')!.classList.contains('error')
    ).toBe(false)
    expect(
      document.body.querySelector('.el-popper')!.classList.contains('success')
    ).toBe(true)
  })

  it('popperAppendToBody', async () => {
    _mount({ popperAppendToBody: false })
    expect(document.body.querySelector('.el-popper__mask')).toBeNull()
    expect(debugWarn).toBeCalled()
  })

  it.todo('teleported')

  it('debounce / fetchSuggestions', async () => {
    const fetchSuggestions = fn()
    const { wrapper } = _mount({
      debounce: 10,
      fetchSuggestions,
      triggerOnFocus: true,
    })
    await nextTick()
    vi.runAllTimers()

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(fetchSuggestions).toHaveBeenCalledTimes(0)
    vi.runAllTimers()
    await nextTick()

    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()

    expect(fetchSuggestions).toHaveBeenCalledTimes(2)
  })

  it('valueKey / modelValue', async () => {
    const { wrapper, state } = _mount()
    await nextTick()
    const target = wrapper.findComponent({ ref: 'autocomplete' })
      .vm as InstanceType<typeof Autocomplete>

    await target.select({ value: 'Go', tag: 'go' })
    expect(state.value).toBe('Go')

    await wrapper.setProps({ valueKey: 'tag' })

    await target.select({ value: 'Go', tag: 'go' })
    expect(state.value).toBe('go')
  })

  it('hideLoading', async () => {
    const { wrapper } = _mount({
      hideLoading: false,
      fetchSuggestions: NOOP,
      debounce: 10,
    })
    await nextTick()
    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.el-icon-loading')).toBeDefined()
    await wrapper.setProps({ hideLoading: true })
    expect(document.body.querySelector('.el-icon-loading')).toBeNull()
  })

  it('selectWhenUnmatched', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        selectWhenUnmatched: true,
        debounce: 10,
      },
    })
    await nextTick()

    wrapper.vm.highlightedIndex = 0
    wrapper.vm.handleKeyEnter()
    vi.runAllTimers()
    await nextTick()

    expect(wrapper.vm.highlightedIndex).toBe(-1)
  })

  it('highlightFirstItem', async () => {
    const { wrapper } = _mount({
      highlightFirstItem: false,
      debounce: 10,
    })
    await nextTick()

    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.highlighted')).toBeNull()

    await wrapper.setProps({ highlightFirstItem: true })

    await wrapper.find('input').trigger('focus')
    vi.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.highlighted')).toBeDefined()
  })

  describe('teleported API', () => {
    it('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount()

      await nextTick()
      expect(
        document.body.querySelector(POPPER_CONTAINER_SELECTOR)!.innerHTML
      ).not.toBe('')
    })

    it('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount({
        teleported: false,
      })

      await nextTick()
      expect(
        document.body.querySelector(POPPER_CONTAINER_SELECTOR)!.innerHTML
      ).toBe('')
    })
  })
})
