<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="gatewayApp.bookCatalogBookCatalog.home.createOrEditLabel"
          data-cy="BookCatalogCreateUpdateHeading"
          v-text="$t('gatewayApp.bookCatalogBookCatalog.home.createOrEditLabel')"
        >
          Create or edit a BookCatalog
        </h2>
        <div>
          <div class="form-group" v-if="bookCatalog.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="bookCatalog.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.title')" for="book-catalog-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="book-catalog-title"
              data-cy="title"
              :class="{ valid: !$v.bookCatalog.title.$invalid, invalid: $v.bookCatalog.title.$invalid }"
              v-model="$v.bookCatalog.title.$model"
              required
            />
            <div v-if="$v.bookCatalog.title.$anyDirty && $v.bookCatalog.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.bookCatalog.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.author')" for="book-catalog-author"
              >Author</label
            >
            <input
              type="text"
              class="form-control"
              name="author"
              id="book-catalog-author"
              data-cy="author"
              :class="{ valid: !$v.bookCatalog.author.$invalid, invalid: $v.bookCatalog.author.$invalid }"
              v-model="$v.bookCatalog.author.$model"
              required
            />
            <div v-if="$v.bookCatalog.author.$anyDirty && $v.bookCatalog.author.$invalid">
              <small class="form-text text-danger" v-if="!$v.bookCatalog.author.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.description')" for="book-catalog-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="book-catalog-description"
              data-cy="description"
              :class="{ valid: !$v.bookCatalog.description.$invalid, invalid: $v.bookCatalog.description.$invalid }"
              v-model="$v.bookCatalog.description.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.bookCatalog.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./book-catalog-update.component.ts"></script>
