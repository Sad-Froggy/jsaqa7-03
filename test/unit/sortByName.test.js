const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
describe("Books names test suit - equal names", () => {
  it("Should return 0 when names are equal", () => {
    const input = ["Гарри Поттер", "гарри поттер", "ГАРРИ ПОТТЕР"];
    const result = sorting.sortByName(input);
    expect(result).toEqual(input);
    expect(result).toHaveLength(3);
  });
})