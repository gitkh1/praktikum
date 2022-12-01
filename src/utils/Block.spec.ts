import chai from 'chai';
import chaiDom from 'chai-dom';

chai.should();
chai.use(chaiDom);

import Block from './Block';
import Templator from './templator';

type TestingClassProps = {
  class1: string;
  class2: string;
  link: string;
  text: string;
};

const templ = `<div class="{{ class1 }}">
<a class="{{ class2 }}" href="{{ link }}">{{ text }}</a>
</div>`;

const testingProps: TestingClassProps = {
  class1: 'user',
  class2: 'user__link',
  link: 'yandex.ru',
  text: 'Ссылка',
};

class TestingClass extends Block<TestingClassProps> {
  constructor(props: TestingClassProps) {
    super(props);
  }

  render() {
    return new Templator().compile(templ, this.props);
  }
}

describe('Компонент', () => {
  describe('Методы класса Block', () => {
    const testingElement = new TestingClass(testingProps);
    it('setProps меняет пропсы элемента', () => {
      testingElement.setProps({ link: 'google.com' });
      chai
        .expect(testingElement.getContent().firstChild?.firstChild)
        .has.attr('href', 'google.com');
    });

    it('hide скрывает элемент', () => {
      testingElement.hide();
      chai.expect(testingElement.getContent()).has.style('display', 'none');
    });

    it('show показывает элемент', () => {
      testingElement.show();
      chai.expect(testingElement.getContent()).has.style('display', 'block');
    });

    it('getContent возвращает элемент', () => {
      chai.expect(testingElement.getContent()).has.tagName('div');
      chai.expect(testingElement.getContent().firstChild).has.tagName('div');
      chai
        .expect(testingElement.getContent().firstChild?.firstChild)
        .has.tagName('a');
      chai
        .expect(testingElement.getContent().firstChild?.firstChild?.textContent)
        .to.be.equal('Ссылка');
    });
  });
});
