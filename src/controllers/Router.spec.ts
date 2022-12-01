import chai from 'chai';
import chaiDom from 'chai-dom';

import auth from '../pages/Auth/Auth';
import err from '../pages/Errors/Err';
import userprofile from '../pages/UserProfile/UserProfile';
import PATHS from './Paths';
import router from './Router';

chai.should();
chai.use(chaiDom);

describe('Роутер', () => {
  describe('Методы классов Router и Route', () => {
    it('Метод use добавляет пути в роутер', () => {
      const APP_ROUTES_COUNT = Object.keys(PATHS).length;
      router.use(auth, '/abc');
      router.use(auth, '/def');
      router.use(auth, '/xyz');
      chai.expect(router.routes.length).to.eq(APP_ROUTES_COUNT + 3);
    });
    it('Метод getRoute находит нужный роут', () => {
      chai.expect(router.getRoute('/settings')?.block).to.eq(userprofile);
    });
    it('Метод getRoute выдает роут ошибки, если роут не найден', () => {
      chai.expect(router.getRoute('/qwerty')?.block).to.eq(err);
    });
  });
});
