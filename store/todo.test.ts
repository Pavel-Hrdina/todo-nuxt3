import { setActivePinia, createPinia } from "pinia";
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { useTodoStore } from "./todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;
  beforeEach(() => {
    store = useTodoStore();
  });
  afterEach(() => {
    store.$reset();
  });
  test("creates a store", () => {
    expect(store).toBeDefined();
  });

  test("Initializes with empty items", () => {
    expect(store.items).toStrictEqual([]);
  });
  test("creates a todo", () => {
    store.add({ title: "Test my code!" });
    expect(store.items[0]).toBeDefined();
    expect(store.items[0].title).toBe("Test my code!");
  });
  test("gets by id", () => {
    store.add({ title: "Test" });
    const item = store.items[0];
    const todo = store.getById(item.id);
    expect(todo).toStrictEqual(item);
  });
  test("gets ordered todos without mutating state", () => {
    const items = [
      {
        createdAt: new Date(2022, 5, 12),
      },
      {
        createdAt: new Date(2018, 5, 12),
      },
      {
        createdAt: new Date(2021, 8, 12),
      },
    ];
    // Don' do this
    // @ts-ignore
    store.items = items;
    const orderedTodo = store.getOrderedTodos;
    expect(orderedTodo[0].createdAt.getFullYear()).toBe(2018);
    expect(orderedTodo[1].createdAt.getFullYear()).toBe(2021);
    expect(orderedTodo[2].createdAt.getFullYear()).toBe(2022);
    expect(store.items[0].createdAt.getFullYear()).toBe(2022);
  });
});
