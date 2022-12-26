/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import BookCatalogUpdateComponent from '@/entities/bookCatalog/book-catalog/book-catalog-update.vue';
import BookCatalogClass from '@/entities/bookCatalog/book-catalog/book-catalog-update.component';
import BookCatalogService from '@/entities/bookCatalog/book-catalog/book-catalog.service';

import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('BookCatalog Management Update Component', () => {
    let wrapper: Wrapper<BookCatalogClass>;
    let comp: BookCatalogClass;
    let bookCatalogServiceStub: SinonStubbedInstance<BookCatalogService>;

    beforeEach(() => {
      bookCatalogServiceStub = sinon.createStubInstance<BookCatalogService>(BookCatalogService);

      wrapper = shallowMount<BookCatalogClass>(BookCatalogUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          bookCatalogService: () => bookCatalogServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 'ABC' };
        comp.bookCatalog = entity;
        bookCatalogServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bookCatalogServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.bookCatalog = entity;
        bookCatalogServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bookCatalogServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBookCatalog = { id: 'ABC' };
        bookCatalogServiceStub.find.resolves(foundBookCatalog);
        bookCatalogServiceStub.retrieve.resolves([foundBookCatalog]);

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
