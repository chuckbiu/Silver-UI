import type { Placement } from "@popperjs/core";
import type { Options } from "@popperjs/core";
export interface TooltipProps {
    trigger?: 'hover' | 'click';
    placement?: Placement,
    content?: string,
    // modifiers?:  
    // strategy?: string
    // 使用Partial 变成可选参数
    popperOptions?: Partial<Options>,
    openDelay?: number, // 打开延迟
    closeDelay?: number // 关闭延迟
    manual?: boolean // 是否手动关闭
}
export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void;
}
export interface TooltipInstance {
    show: () => void;
    hide: () => void;
}