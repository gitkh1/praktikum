import chai from 'chai';
import chaiDom from 'chai-dom';

chai.should();
chai.use(chaiDom);

import Templator from './templator';

const templ = `<div class="{{ class1 }}">
<a class="{{ class2 }}" href="{{ link }}">{{ text }}</a>
</div>`;

const ctx = {
  class1: 'user',
  class2: 'user__link',
  link: 'yandex.ru',
  text: 'Пользователь',
};

describe('Шаблонизатор', () => {
  const fragment = new Templator().compile(templ, ctx);
  const element = fragment.firstChild;
  describe('Возвращает DOM-элемент', () => {
    it('Элемент div с классом user', () => {
      chai.expect(element).has.tagName('div');
      chai.expect(element).has.class(ctx.class1);
    });
    it('Внутри есть ссылка yandex.ru с классом user__link', () => {
      chai.expect(element?.firstChild).has.tagName('a');
      chai.expect(element?.firstChild).has.class(ctx.class2);
      chai.expect(element?.firstChild).has.attr('href', ctx.link);
    });
    it('Внутри ссылки есть еще текстовый элемент', () => {
      chai.expect(element?.firstChild?.textContent).equal(ctx.text);
    });
  });
});
