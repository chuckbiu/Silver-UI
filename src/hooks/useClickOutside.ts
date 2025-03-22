import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue';
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {

    function handler(e: MouseEvent) {
        if (elementRef.value && e.target){
            // 包含 会自动寻找
           if(!elementRef.value.contains(e.target as HTMLElement)){
                callback(e)
           }            
        }
    }
    onMounted(()=>{
        document.addEventListener('click', handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('click', handler)
    })
}
export default useClickOutside;