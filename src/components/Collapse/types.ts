import type { Ref, InjectionKey } from 'vue';

export type NameType = string | number;

export interface CollapsedefineProps {
    modelValue: NameType[];
    accordion?: boolean;
}
export interface CollapsedefineEmits {
    (e: 'update:modelValue', value: NameType[]): void;
    (e: 'change', value: NameType[]): void;
}

export interface CollapseItemProps {
    name: NameType;
    disabled?: boolean;
    title?: string;
}
// 创建一个context
export interface CollapseContext {
    activeNames: Ref<NameType[]>;
    handleHeaderClick: (name: NameType) => void;
}
// 创建key
export const collapseInjectionKey = Symbol() as InjectionKey<CollapseContext>;