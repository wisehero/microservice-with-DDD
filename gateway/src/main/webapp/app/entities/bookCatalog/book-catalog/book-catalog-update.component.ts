import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { IBookCatalog, BookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookCatalogService from './book-catalog.service';

const validations: any = {
  bookCatalog: {
    title: {
      required,
    },
    author: {
      required,
    },
    description: {},
  },
};

@Component({
  validations,
})
export default class BookCatalogUpdate extends Vue {
  @Inject('bookCatalogService') private bookCatalogService: () => BookCatalogService;
  @Inject('alertService') private alertService: () => AlertService;

  public bookCatalog: IBookCatalog = new BookCatalog();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookCatalogId) {
        vm.retrieveBookCatalog(to.params.bookCatalogId);
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
    if (this.bookCatalog.id) {
      this.bookCatalogService()
        .update(this.bookCatalog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('bookCatalogApp.bookCatalogBookCatalog.updated', { param: param.id });
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
      this.bookCatalogService()
        .create(this.bookCatalog)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('bookCatalogApp.bookCatalogBookCatalog.created', { param: param.id });
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

  public retrieveBookCatalog(bookCatalogId): void {
    this.bookCatalogService()
      .find(bookCatalogId)
      .then(res => {
        this.bookCatalog = res;
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
