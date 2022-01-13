import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Checkbox from '../src/checkbox.vue'
import CheckboxButton from '../src/checkbox-button.vue'
import CheckboxGroup from '../src/checkbox-group.vue'
import type { VueWrapper } from '@vue/test-utils'

const _mount = (renderFn: () => any) =>
  mount({
    setup: () => renderFn,
  })

const clickCheckbox = async (el: VueWrapper<any>) => {
  await el.trigger('click')
  await el.find('input').trigger('change')
}

describe('Checkbox', () => {
  test('create', async () => {
    const checkbox = ref(false)
    const wrapper = _mount(() => (
      <Checkbox v-model={checkbox.value} label="a" />
    ))
    expect(wrapper.classes()).toContain('el-checkbox')

    await clickCheckbox(wrapper)
    expect(wrapper.classes()).toContain('is-checked')

    await clickCheckbox(wrapper)
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  test('no v-model', async () => {
    const wrapper = mount(() => <Checkbox label="a" />)
    expect(wrapper.classes('is-checked')).toBe(false)

    await clickCheckbox(wrapper)
    expect(wrapper.classes('is-checked')).toBe(true)
  })

  test('disabled', async () => {
    const checkbox = ref(false)
    const wrapper = _mount(() => (
      <Checkbox v-model={checkbox.value} disabled label="a" />
    ))
    expect(wrapper.classes()).toContain('is-disabled')

    await clickCheckbox(wrapper)
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('change event', async () => {
    const onChange = vitest.fn()
    const checked = ref(false)
    const wrapper = _mount(() => (
      <Checkbox v-model={checked.value} onChange={onChange} />
    ))

    await clickCheckbox(wrapper)
    expect(onChange).toBeCalled()
  })

  test('checkbox group', async () => {
    const checkList = ref<string[]>([])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value}>
        <Checkbox label="a" ref="a" />
        <Checkbox label="b" ref="b" />
        <Checkbox label="c" ref="c" />
        <Checkbox label="d" ref="d" />
      </CheckboxGroup>
    ))
    expect(checkList.value.length).toBe(0)

    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    expect(checkList.value.length).toBe(1)
    expect(checkList.value).toContain('a')

    await clickCheckbox(wrapper.findComponent({ ref: 'b' }))
    expect(checkList.value.length).toBe(2)
    expect(checkList.value).toContain('a')
    expect(checkList.value).toContain('b')
  })

  test('checkbox group without modelValue', async () => {
    const checkList = ref<string[] | undefined>(undefined)
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value}>
        <Checkbox label="a" ref="a" />
        <Checkbox label="b" ref="b" />
        <Checkbox label="c" ref="c" />
        <Checkbox label="d" ref="d" />
      </CheckboxGroup>
    ))

    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    expect(checkList.value?.length).toBe(1)
    expect(checkList.value).toContain('a')
  })

  test('checkbox group change', async () => {
    const checkList = ref<string[]>()
    const onChange = vitest.fn()
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value} onChange={onChange}>
        <Checkbox label="a" ref="a" />
        <Checkbox label="b" ref="b" />
      </CheckboxGroup>
    ))
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    await nextTick()
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).lastCalledWith(['a'])
  })

  test('nested group', async () => {
    const checkList = ref<string[]>([])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value}>
        <div>
          <Checkbox label="a" ref="a" />
          <Checkbox label="b" ref="b" />
          <Checkbox label="c" ref="c" />
          <Checkbox label="d" ref="d" />
        </div>
      </CheckboxGroup>
    ))
    expect(checkList.value.length).toBe(0)
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    expect(checkList.value).toEqual(['a'])
  })

  test('true false label', async () => {
    const checked = ref('a')
    const wrapper = _mount(() => (
      <Checkbox true-label="a" falseLabel={3} v-model={checked.value} />
    ))
    await clickCheckbox(wrapper)
    expect(checked.value).toBe(3)
  })

  test('check', () => {
    const checked = ref(false)
    const checkList = ref<string[]>([])
    _mount(() => (
      <div>
        <Checkbox v-model={checked.value} checked />
        <CheckboxGroup v-model={checkList.value}>
          <Checkbox checked label="a" />
        </CheckboxGroup>
      </div>
    ))
    expect(checked.value).toBe(true)
    expect(checkList.value).toEqual(['a'])
  })

  test('label', async () => {
    const checkList = ref<string[]>([])
    const wrapper = _mount(() => (
      <div>
        <CheckboxGroup v-model={checkList.value}>
          <Checkbox label="">all</Checkbox>
          <Checkbox label="a">a</Checkbox>
          <Checkbox label="b">b</Checkbox>
        </CheckboxGroup>
      </div>
    ))
    await clickCheckbox(wrapper.find('.el-checkbox'))
    expect(checkList.value.length).toBe(1)
    expect(checkList.value[0]).toEqual('')
  })
})

describe('check-button', () => {
  test('create', async () => {
    const checkbox = ref(false)
    const wrapper = _mount(() => (
      <CheckboxButton v-model={checkbox.value} label="a" />
    ))
    expect(wrapper.classes()).toContain('el-checkbox-button')
    await clickCheckbox(wrapper)
    expect(wrapper.classes()).toContain('is-checked')
    await clickCheckbox(wrapper)
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const checkbox = ref(false)
    const disabled = ref(true)
    const wrapper = _mount(() => (
      <CheckboxButton
        v-model={checkbox.value}
        disabled={disabled.value}
        label="a"
      />
    ))
    expect(wrapper.classes()).toContain('is-disabled')
    expect(checkbox.value).toBe(false)

    await clickCheckbox(wrapper)
    expect(wrapper.classes()).toContain('is-disabled')
    expect(checkbox.value).toBe(false)

    disabled.value = false
    await nextTick()
    await clickCheckbox(wrapper)
    expect(wrapper.classes()).not.toContain('is-disabled')
    expect(checkbox.value).toBe(true)
  })

  test('change event', async () => {
    const checked = ref(false)
    const onChange = vitest.fn()
    const wrapper = _mount(() => (
      <CheckboxButton v-model={checked.value} onChange={onChange} />
    ))

    await clickCheckbox(wrapper)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe(true)
  })

  test('button group change', async () => {
    const onChange = vitest.fn()
    const checkList = ref<string[]>([])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value} onChange={onChange}>
        <CheckboxButton label="a" ref="a" />
        <CheckboxButton label="b" ref="b" />
        <CheckboxButton label="c" ref="c" />
        <CheckboxButton label="d" ref="d" />
      </CheckboxGroup>
    ))
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    await nextTick() // await change event
    expect(onChange.mock.calls[0][0]).toEqual(['a'])
    await clickCheckbox(wrapper.findComponent({ ref: 'b' }))
    await nextTick() // await change event
    expect(onChange.mock.calls[1][0]).toEqual(['a', 'b'])
  })

  test('button group props', () => {
    const checkList = ref<string[]>(['a', 'b'])
    const a = ref<{ $el: HTMLLabelElement }>(undefined as any)

    _mount(() => (
      <CheckboxGroup
        v-model={checkList.value}
        size="large"
        fill="#FF0000"
        text-color="#000"
      >
        <CheckboxButton label="a" ref={a} />
      </CheckboxGroup>
    ))
    expect(checkList.value.length).toBe(2)

    expect(a.value.$el.classList.contains('is-checked')).toBe(true)
    expect(
      a.value.$el.querySelector<HTMLSpanElement>('.el-checkbox-button__inner')!
        .style.borderColor
    ).toEqual('#ff0000')
  })

  test('button group tag', () => {
    const checkList = ref<string[]>(['a', 'b'])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value} tag="tr">
        <CheckboxButton label="a" ref="a" />
        <CheckboxButton label="b" ref="b" />
        <CheckboxButton label="c" ref="c" />
        <CheckboxButton label="d" ref="d" />
      </CheckboxGroup>
    ))
    expect(wrapper.find('tr').classes('el-checkbox-group')).toBeTruthy()
  })

  test('button group min and max', async () => {
    const checkList = ref<string[]>(['a', 'b'])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value} min={2} max={3}>
        <CheckboxButton label="a" ref="a" />
        <CheckboxButton label="b" ref="b" />
        <CheckboxButton label="c" ref="c" />
        <CheckboxButton label="d" ref="d" />
        <CheckboxButton label="e" ref="e" />
      </CheckboxGroup>
    ))
    expect(checkList.value.length).toBe(2)
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    await nextTick()
    expect(checkList.value.length).toBe(2)
    await clickCheckbox(wrapper.findComponent({ ref: 'c' }))
    expect(checkList.value.length).toBe(3)
    expect(checkList.value).toEqual(['a', 'b', 'c'])
    expect(wrapper.findComponent({ ref: 'd' }).vm.isDisabled).toBe(true)
    expect(wrapper.findComponent({ ref: 'e' }).vm.isDisabled).toBe(true)
    checkList.value = []
    await nextTick()
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    await clickCheckbox(wrapper.findComponent({ ref: 'd' }))
    expect(checkList.value).toEqual(['a', 'd'])
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    expect(checkList.value).toEqual(['a', 'd'])
    expect(wrapper.findComponent({ ref: 'a' }).vm.isDisabled).toBe(true)
  })

  test('nested group', async () => {
    const checkList = ref<string[]>([])
    const wrapper = _mount(() => (
      <CheckboxGroup v-model={checkList.value}>
        <div>
          <CheckboxButton label="a" ref="a" />
          <CheckboxButton label="b" ref="b" />
          <CheckboxButton label="c" ref="c" />
          <CheckboxButton label="d" ref="d" />
        </div>
      </CheckboxGroup>
    ))
    expect(checkList.value.length).toBe(0)
    await clickCheckbox(wrapper.findComponent({ ref: 'a' }))
    expect(checkList.value).toEqual(['a'])
  })

  test('true false label', async () => {
    const checked = ref('a')
    const wrapper = _mount(() => (
      <CheckboxButton true-label="a" falseLabel={3} v-model={checked.value} />
    ))
    await clickCheckbox(wrapper)
    expect(checked.value).toBe(3)
  })

  test('check', () => {
    const checked = ref(false)
    const checklist = ref<string[]>([])
    _mount(() => (
      <div>
        <CheckboxButton v-model={checked.value} checked />
        <CheckboxGroup v-model={checklist.value}>
          <CheckboxButton checked label="a" />
        </CheckboxGroup>
      </div>
    ))
    expect(checked.value).toBe(true)
    expect(checklist.value).toEqual(['a'])
  })

  test('checked', () => {
    const wrapper = _mount(() => <Checkbox checked />)
    expect(wrapper.find('.el-checkbox').classes().toString()).toMatch(
      'is-checked'
    )
  })
})
