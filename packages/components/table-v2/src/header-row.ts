import { buildProps, definePropType } from '@element-plus/utils'
import { columns } from './common'

import type { CSSProperties, ExtractPropTypes } from 'vue'

export const tableV2HeaderRowProps = buildProps({
  class: String,
  columns,
  headerIndex: Number,
  style: { type: definePropType<CSSProperties>(Object) },
} as const)

export type TableV2HeaderRowProps = ExtractPropTypes<
  typeof tableV2HeaderRowProps
>
