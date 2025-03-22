import type { VNode } from "vue";
import type { TooltipProps } from "../Tooltip/type";

export interface MenuOption {
    // 难点
    label: string | VNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean; // 分隔符
 }

 export interface DropdownProps extends TooltipProps {
    menuOption: MenuOption[], // 弹出层各种选项
    hideAfterClick?: boolean
 }

// 事件
export interface DropdownEmits {
    // 是否展开
    (e: 'visible-change', value: boolean) : void;
    // 弹出层选项
    (e: 'select', value: MenuOption) : void;
}
// 实例
export interface DropdownInstance {
    show: () => void;
    close: () => void;
}