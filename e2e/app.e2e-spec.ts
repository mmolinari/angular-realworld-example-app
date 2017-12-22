import { Ng2RealApp } from './app.po';
import {
    browser, element, by
} from 'protractor';

describe('ng-demo App', () => {
    let page: Ng2RealApp;

    beforeEach(() => {
        page = new Ng2RealApp();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toContain('conduit');
    });

    it('should not be able to save an empty todo', () => {
        browser.get('/');
        const newTodoInput = element(by.css('.add-todo input[type=text]'));

        const newTodoSubmitButton = element(
            by.css('.add-todo input[type=submit]'));
        newTodoSubmitButton.click();

        const todos = element.all(by.css('.todos .todo'));
        expect<any>(todos.count()).toEqual(3);
    })
});
