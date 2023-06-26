import { beforeEach, describe, expect, it } from "vitest";
import { useStore } from ".";

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: "Iniciando com React",
      lessons: [
        { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
        {
          id: "w-DW4DhDfcw",
          title: "Estilização do Post",
          duration: "10:05",
        },
      ],
    },
    {
      id: 2,
      title: "Estrutura da aplicação",
      lessons: [
        {
          id: "gE48FQXRZ_o",
          title: "Componente: Comment",
          duration: "13:45",
        },
      ],
    },
  ],
};

const initialState = useStore.getState();

describe("zustand store ", () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });

  it("should be able to play", () => {
    const { play } = useStore.getState();

    play([1, 2]);

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(2);
  });

  it("should be able to play the next video automatically", () => {
    useStore.setState({
      course,
    });

    const { next } = useStore.getState();

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to the next module automatically", () => {
    useStore.setState({
      course,
      currentLessonIndex: 1,
    });

    const { next } = useStore.getState();

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });

  it("should not be to update the current module and lesson index if there is no next lesson available", () => {
    useStore.setState({ course, currentModuleIndex: 1, currentLessonIndex: 1 });

    const { next } = useStore.getState();

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(1);
  });
});
