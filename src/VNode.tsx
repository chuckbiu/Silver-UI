    // const vnode = {
    //     type: 'div',
    //     props: {
    //         id: 'hello'
    //     },
    //     children: [
    //         /* 更多 vnode */
    //     ]
    //     }
    import { h, defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'VNode',
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        // setup(props) {
        //     const count = ref(1)
        //     return () => h('h1', props.msg + count.value)
        // }
        setup(props) {
            const count = ref(1)
            return () => (
                <div>
                    <h1>{props.msg}</h1>
                    <p>{count.value}</p>
                </div>
            )
        }
    })
