import Secret from '@/views/Secret';
import flushPromises from 'flush-promises';
import { shallowMount } from "@vue/test-utils";

jest.mock("firebase/app", () => ({
  auth() {
    return {
      signOut: () => {
        return Promise.resolve();
      },
      onAuthStateChanged(fnc) {
        return fnc(true);
      },
      currentUser: {
        getIdToken: () => {
          return Promise.resolve("token");
        }
      },
    };
  }
}));

/*  1. unit mock: 對象在要測試的檔案有被 import 可以用這個方式 mock
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve({ data: [
        {
        char_id: 1,
        name: "test",
      },
      {
        char_id: 2,
        name: "test2",
      } ,
      {
        char_id: 3,
        name: "test3",
      }
    ] }))
    }));
*/

const $axios = {
  get: jest.fn(() => Promise.resolve({
    data: [
      {
        char_id: 1,
        name: "test",
      },
      {
        char_id: 2,
        name: "test2",
      },
      {
        char_id: 3,
        name: "test3",
      }
    ]
  }))
};

describe("Secret.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Secret, {
      methods: {
      },
      // eslint-disable-next-line no-unused-vars
      /* global mock: 對象在 main.js 等檔案被 import 的話要用這個方式 mock */
      mocks: {
        $router: {
          replace: jest.fn()
        },
        $axios
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render numbers of h5 by secrets", async () => {
    /* 3. 呼叫 api 是非同步行為，需要使用 flushPromises 等待反應完成 */
    await flushPromises();
    expect(wrapper.findAll("h5").length).toBe(3);
  });

});