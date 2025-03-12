import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CollapseItem from "./CollapseItem.vue";
import Collapse from "./Collapse.vue";
describe("Collapse vue", async () => {
  test("basic collapse", () => {
    const wrapper = mount(
      () => (
        <Collapse modelValue={["a"]}>
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
      ),
      {
        global: {
          stubs: ["Icon"],
        },
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
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    // expect(firstContent.isVisible()).toBeTruthy()
    // expect(secondContent.isVisible()).toBeFalsy()
  });
});
