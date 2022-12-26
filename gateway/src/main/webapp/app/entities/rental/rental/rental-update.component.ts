import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { IRental, Rental } from '@/shared/model/rental/rental.model';
import RentalService from './rental.service';
import { RentalStatus } from '@/shared/model/enumerations/rental-status.model';

const validations: any = {
  rental: {
    userId: {},
    rentalStatus: {},
  },
};

@Component({
  validations,
})
export default class RentalUpdate extends Vue {
  @Inject('rentalService') private rentalService: () => RentalService;
  @Inject('alertService') private alertService: () => AlertService;

  public rental: IRental = new Rental();
  public rentalStatusValues: string[] = Object.keys(RentalStatus);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rentalId) {
        vm.retrieveRental(to.params.rentalId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.rental.id) {
      this.rentalService()
        .update(this.rental)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('rentalApp.rentalRental.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.rentalService()
        .create(this.rental)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('rentalApp.rentalRental.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveRental(rentalId): void {
    this.rentalService()
      .find(rentalId)
      .then(res => {
        this.rental = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
