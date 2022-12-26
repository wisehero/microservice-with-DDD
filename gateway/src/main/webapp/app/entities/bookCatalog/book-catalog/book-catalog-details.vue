<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bookCatalog">
        <h2 class="jh-entity-heading" data-cy="bookCatalogDetailsHeading">
          <span v-text="$t('gatewayApp.bookCatalogBookCatalog.detail.title')">BookCatalog</span> {{ bookCatalog.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span>
          </dt>
          <dd>
            <span>{{ bookCatalog.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span>
          </dt>
          <dd>
            <span>{{ bookCatalog.author }}</span>
          </dd>
          <dt>
            <span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span>
          </dt>
          <dd>
            <span>{{ bookCatalog.description }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="bookCatalog.id"
          :to="{ name: 'BookCatalogEdit', params: { bookCatalogId: bookCatalog.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./book-catalog-details.component.ts"></script>
