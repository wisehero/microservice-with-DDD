/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RentalUpdateComponent from '@/entities/rental/rental/rental-update.vue';
import RentalClass from '@/entities/rental/rental/rental-update.component';
import RentalService from '@/entities/rental/rental/rental.service';

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
  describe('Rental Management Update Component', () => {
    let wrapper: Wrapper<RentalClass>;
    let comp: RentalClass;
    let rentalServiceStub: SinonStubbedInstance<RentalService>;

    beforeEach(() => {
      rentalServiceStub = sinon.createStubInstance<RentalService>(RentalService);

      wrapper = shallowMount<RentalClass>(RentalUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          rentalService: () => rentalServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.rental = entity;
        rentalServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentalServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.rental = entity;
        rentalServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentalServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRental = { id: 123 };
        rentalServiceStub.find.resolves(foundRental);
        rentalServiceStub.retrieve.resolves([foundRental]);

        // WHEN
        comp.beforeRouteEnter({ params: { rentalId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.rental).toBe(foundRental);
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
