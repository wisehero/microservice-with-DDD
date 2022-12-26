import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import RentalService from './rental/rental/rental.service';
import BookService from './book/book/book.service';
import BookCatalogService from './bookCatalog/book-catalog/book-catalog.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('rentalService') private rentalService = () => new RentalService();
  @Provide('bookService') private bookService = () => new BookService();
  @Provide('bookCatalogService') private bookCatalogService = () => new BookCatalogService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
