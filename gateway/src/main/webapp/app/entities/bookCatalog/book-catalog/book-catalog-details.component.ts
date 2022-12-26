import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import BookCatalogService from './book-catalog.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BookCatalogDetails extends Vue {
  @Inject('bookCatalogService') private bookCatalogService: () => BookCatalogService;
  @Inject('alertService') private alertService: () => AlertService;

  public bookCatalog: IBookCatalog = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookCatalogId) {
        vm.retrieveBookCatalog(to.params.bookCatalogId);
      }
    });
  }

  public retrieveBookCatalog(bookCatalogId) {
    this.bookCatalogService()
      .find(bookCatalogId)
      .then(res => {
        this.bookCatalog = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
