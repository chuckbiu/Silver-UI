import type { VNode, ComponentInternalInstance} from "vue";
type type = "success" | "warning" | "info" | "error";

export interface MessageProps {
  message?: string | VNode; // 弹出内容
  duration?: number; // 显示时间
  showclose?: boolean; // 关闭
  type?: type; // 类型
  onDestory: () => void;
  id: string;
  offset?: number; // 偏移量
  zIndex: number; // 层级
  transitionName?: string;
}
// 重新忽略 某个属性
export type CreateMessageProps = Omit<MessageProps, "onDestory" | 'id' | 'zIndex'>;

// 数组类型定义
export interface MeassageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}
