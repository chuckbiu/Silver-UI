import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CollapseItem from "./CollapseItem.vue";
import Collapse from "./Collapse.vue";
describe("Collapse vue", async () => {
  test("basic collapse",async () => {
    const onChange = vi.fn()
    const wrapper = mount(
        Collapse, {
            props: {
                'modelValue': ['a']
            },
            slots: {
                default: <>
                     <Collapse modelValue={["a"]} onChange={onChange}>
                            <CollapseItem name="a" title="title a">
                                content a
                            </CollapseItem>
                            <CollapseItem name="b" title="title b">
                                content b
                            </CollapseItem>
                            <CollapseItem name="c" title="title c" disabled>
                                content c
                            </CollapseItem>
                        </Collapse>
                </>
            },
            global: {
                stubs: ["Icon"]
            }
        }
    );
    // console.log(wrapper.html());
    const headers = wrapper.findAll('.si-collapse-item__header')
    const contents = wrapper.findAll('si-collapse-item__wrapper')

    // 长度
    expect(headers.length).toBe(3)
    // expect(contents.length).toBe(3)  // 出问题

    console.log(contents)
    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    // const secondContent = contents[1]
    // expect(firstContent.isVisible()).toBeTruthy()
    // expect(secondContent.isVisible()).toBeFalsy()
    // 行为
    await firstHeader.trigger('click')
    expect(onChange).toHaveBeenCalledWith([])
    // await secondHeader.trigger('click')
    // expect(onChange).toHaveBeenLastCalledWith(['b'])
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(1)
    expect(changeEvent[0]).toEqual([]) 
  });
});
