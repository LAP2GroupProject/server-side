const habits = require("../../static/scripts/habits");

describe("Test HTML Content", () => {
  test("should show correct main (no-habit) title", () => {
    const mainTitle = habits.noHabitsSection.firstChild;
    expect(mainTitle.textContent).toEqual("You have no habits");
  });

  test("should show correct (no-habit) btn label", () => {
    const btn = habits.createHabitButton;
    expect(btn.textContent).toEqual("Create Habit");
  });

  test("should show correct main title", () => {
    const mainTitle = habits.selectHabitSection.firstChild;
    expect(mainTitle.textContent).toEqual("Let's get started.");
  });

  test("should show correct sub title", () => {
    const subTitle = habits.selectHabitSection.firstChild.nextSibling;
    expect(subTitle.textContent).toEqual("Choose a habit:");
  });

  test("should show correct form options", () => {
    const formOptions = habits.selectHabitButtons.length;
    expect(formOptions).toEqual(3);
  });

  test("should show correct type for form option values", () => {
    const formOptionsValues = habits.selectHabitButtons.values;
    expect(typeof formOptionsValues).toEqual("string");
  });
});
