import { StoreState } from '../../controller/state';
import { Search } from './search';

// Обязательно пишем describe, чтобы в логах было понятно, что тестируем
describe('Search', () => {
  /*
  Это необходимо далеко не всегда, но я предпочитаю создавать новый инстанс
  тестируемой сущности перед каждым тестом, чтобы избежать случайных мутаций
  (когда в рамках одного теста сущность изменилась и это может повлиять на остальные).

  Объявляем переменную в общем скоупе, чтобы она была доступна в каждом тесте,
  а присваиваем перед каждым тестом заново (см. ниже)
  */
  let search: Search;
  let spiedCreateElement: jest.SpyInstance;
  let mockElement: Partial<HTMLInputElement>;

  /*
  Все зависимости тестируемого класса подменяем «фейками». В юнит-тестах мы тестируем
  только одну сущность (класс, функцию) за раз. Этот тест посвящён классу Search,
  поэтому нас не интересует, как ведут себя его зависимости.

  Добавим типы, чтобы не ошибиться в наименованиях.
  Сделаем их Partial, чтобы не описывать все методы/свойства, а только те,
  которые используются в Search.
   */
  const mockState: Partial<StoreState> = {
    search: 'mock search', // случайная строка, ниже мы будем смотреть, используется ли она
    changeState: jest.fn(), // что происходит в настоящем changeState() нас не интересует в этом тесте (это должно быть протестировано в тестах к StoreState). Нам главное проверить, что он вызывается в нужных местах, и что мы правильно обрабатываем возвращаемое им значение. Поэтому подставляем мок-функцию (https://jestjs.io/docs/jest-object#jestfnimplementation)
  };
  const mockParentNode: Partial<HTMLElement> = {
    append: jest.fn(),
  };

  // Вешаем шпиона на document.createElement, чтобы отслеживать его вызовы;
  // возвращаем фальшивый элемент, чтобы проверять его в тестах.
  // Перед каждым тестом создаём тестируемый класс (см. выше).
  beforeEach(() => {
    mockElement = {
      addEventListener: jest.fn(),
    };
    spiedCreateElement = jest
      .spyOn(globalThis.document, 'createElement')
      .mockImplementation()
      .mockReturnValue(mockElement as HTMLInputElement);
    search = new Search(mockParentNode as HTMLElement, mockState as StoreState);
  });

  // После каждого теста сбрасываем счётчики мок-функций и возвращаем оригинальную
  // имплементацию методов, если мы их подменяли
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  // на каждый метод свой describe
  describe('constructor()', () => {
    it('should assign state arg to the "state" property', () => {
      expect(search['state']).toBe(mockState); // toBe потому что мы проверяем не просто, что это объект с такими же свойствами, а что это ТОТ ЖЕ объект, что мы передали в конструктор.
    });

    it('should create input element and assign it to the "element" property', () => {
      expect(spiedCreateElement).toHaveBeenCalledTimes(1);
      expect(spiedCreateElement).toHaveBeenCalledWith('input');
      expect(search['element']).toBe(mockElement);
    });

    it('should fill the element with init values', () => {
      expect(search['element']).toMatchObject({
        placeholder: 'Szukaj...',
        type: 'search',
        value: mockState.search ? mockState.search : '',
        className: 'search',
        autofocus: true,
      }); // Используем toMatchObject, а не toEqual, потому что в настоящем объекте может быть намного больше свойств (например, метод addEventListener), но нас интересуют только конкретные.
    });

    it('should append the element to parent node', () => {
      expect(mockParentNode.append).toHaveBeenCalledTimes(1);
      expect(mockParentNode.append).toHaveBeenCalledWith(search['element']);
    });

    it('should add event listener to the element', () => {
      expect(search['element']['addEventListener']).toHaveBeenCalledTimes(1);
      expect(search['element']['addEventListener']).toHaveBeenCalledWith('input', expect.any(Function));
    });
  });

  describe('input()', () => {
    it('should change state', () => {
      search.input();
      expect(mockState.changeState).toHaveBeenCalledTimes(1);
      expect(mockState.changeState).toHaveBeenCalledWith({
        search: search['element'].value,
      });
    });

    it('should return nothing', () => {
      const result = search.input();
      expect(result).toBeUndefined();
    });
  });
});
