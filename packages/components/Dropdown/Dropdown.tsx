import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { MenuOption } from './types'
import type { TooltipInstance } from '@/components/Tooltip/type.ts'

export default defineComponent({
  name: 'SiDropdown', // 名称
  // 传值
  props: {
    placement: {
      // as PropType 更加准确定义类型
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'click',
    },
    transisition: {
      type: String,
      default: 'fade',
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
      required: false,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
  },
  // 定义事件
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)

    const itemClick = (e: MenuOption) => {
      // 假如是否禁用
      if (e.disabled) {
        return
      }
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    // 作为中间层传递作用
    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    })
    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided
              ? (
                  <li role="separator" class="divided-placeholder"></li>
                )
              : (
                  ''
                )}
            <li
              // 动态展示样式
              class={{
                'si-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    return () => (
      <div class="si-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="si-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    )
  },
})
