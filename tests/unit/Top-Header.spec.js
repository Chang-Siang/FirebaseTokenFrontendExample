import TopHeader from "@/components/Top-Header.vue";
import flushPromises from 'flush-promises';
import { shallowMount } from "@vue/test-utils";

// 1. 單元測試不需要實際呼叫 api 所以把它 mock 起來
jest.mock("firebase/app", () => ({
  auth() {
    return {
      signOut: () => {
        return Promise.resolve();
      },
      onAuthStateChanged(fnc) {
        return fnc(true);
      },
    };
  }
}));

describe("TopHeader.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TopHeader, {
      methods: {
        /* 2. 可以把 mounted 裡面做的事情包裝成 setup 函數，方便 mock */
        // setupFirebase: jest.fn()
      },
      mocks: {
        /* 3. 全域型的函數要在這裡 mock, ex: $router */
        $router: {
          replace: jest.fn()
        }
      }
    });
  });

  afterEach(() => {
    /* 4. 每個 it 執行完都會清除上次的 mock log */
    jest.restoreAllMocks();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("does h1 has correct text", () => {
    expect(wrapper.find("h1").text()).toBe("Logged in");
  });

  it("logggedIn should be true when onAuthStateChanged return a user", () => {
    expect(wrapper.vm.loggedIn).toBe(true);
  });

  it("$router.replace should be called with `login` when click but", async () => {
    /* 5. trigger 是非同步事件，需要使用 flushPromises 等待反應完成 */
    wrapper.find("button").trigger("click");
    await flushPromises();
    expect(wrapper.vm.$router.replace).toBeCalledWith({ name: "login" });
  });
});