import type { Placement } from "@popperjs/core";
import type { Options } from "@popperjs/core";
export interface TooltipProps {
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: Placement,
    // modifiers?:  
    // strategy?: string
    // 使用Partial 变成可选参数
    popperOptions?: Partial<Options>
}
export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void;
}