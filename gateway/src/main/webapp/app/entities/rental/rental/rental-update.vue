<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="gatewayApp.rentalRental.home.createOrEditLabel"
          data-cy="RentalCreateUpdateHeading"
          v-text="$t('gatewayApp.rentalRental.home.createOrEditLabel')"
        >
          Create or edit a Rental
        </h2>
        <div>
          <div class="form-group" v-if="rental.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="rental.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('gatewayApp.rentalRental.userId')" for="rental-userId">User Id</label>
            <input
              type="number"
              class="form-control"
              name="userId"
              id="rental-userId"
              data-cy="userId"
              :class="{ valid: !$v.rental.userId.$invalid, invalid: $v.rental.userId.$invalid }"
              v-model.number="$v.rental.userId.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('gatewayApp.rentalRental.rentalStatus')" for="rental-rentalStatus"
              >Rental Status</label
            >
            <select
              class="form-control"
              name="rentalStatus"
              :class="{ valid: !$v.rental.rentalStatus.$invalid, invalid: $v.rental.rentalStatus.$invalid }"
              v-model="$v.rental.rentalStatus.$model"
              id="rental-rentalStatus"
              data-cy="rentalStatus"
            >
              <option
                v-for="rentalStatus in rentalStatusValues"
                :key="rentalStatus"
                v-bind:value="rentalStatus"
                v-bind:label="$t('gatewayApp.RentalStatus.' + rentalStatus)"
              >
                {{ rentalStatus }}
              </option>
            </select>
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
            :disabled="$v.rental.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./rental-update.component.ts"></script>
