<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="rental">
        <h2 class="jh-entity-heading" data-cy="rentalDetailsHeading">
          <span v-text="$t('gatewayApp.rentalRental.detail.title')">Rental</span> {{ rental.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('gatewayApp.rentalRental.userId')">User Id</span>
          </dt>
          <dd>
            <span>{{ rental.userId }}</span>
          </dd>
          <dt>
            <span v-text="$t('gatewayApp.rentalRental.rentalStatus')">Rental Status</span>
          </dt>
          <dd>
            <span v-text="$t('gatewayApp.RentalStatus.' + rental.rentalStatus)">{{ rental.rentalStatus }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="rental.id" :to="{ name: 'RentalEdit', params: { rentalId: rental.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./rental-details.component.ts"></script>
