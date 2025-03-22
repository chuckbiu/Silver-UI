import { defineComponent } from "vue";
// 封装一个Render 渲染函数 （通用）
const RenderVode = defineComponent({
    props: {
        vNode: {
            type: [String, Object],
            required: true
        }
    },
    setup(props){
        return () => props.vNode
    }
    
})
export default RenderVode;