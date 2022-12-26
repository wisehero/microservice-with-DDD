/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import BookCatalogDetailComponent from '@/entities/bookCatalog/book-catalog/book-catalog-details.vue';
import BookCatalogClass from '@/entities/bookCatalog/book-catalog/book-catalog-details.component';
import BookCatalogService from '@/entities/bookCatalog/book-catalog/book-catalog.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BookCatalog Management Detail Component', () => {
    let wrapper: Wrapper<BookCatalogClass>;
    let comp: BookCatalogClass;
    let bookCatalogServiceStub: SinonStubbedInstance<BookCatalogService>;

    beforeEach(() => {
      bookCatalogServiceStub = sinon.createStubInstance<BookCatalogService>(BookCatalogService);

      wrapper = shallowMount<BookCatalogClass>(BookCatalogDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { bookCatalogService: () => bookCatalogServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBookCatalog = { id: 'ABC' };
        bookCatalogServiceStub.find.resolves(foundBookCatalog);

        // WHEN
        comp.retrieveBookCatalog('ABC');
        await comp.$nextTick();

        // THEN
        expect(comp.bookCatalog).toBe(foundBookCatalog);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBookCatalog = { id: 'ABC' };
        bookCatalogServiceStub.find.resolves(foundBookCatalog);

        // WHEN
        comp.beforeRouteEnter({ params: { bookCatalogId: 'ABC' } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.bookCatalog).toBe(foundBookCatalog);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
