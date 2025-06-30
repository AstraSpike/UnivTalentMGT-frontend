import { defineStore } from 'pinia';

export const useTrainingStore = defineStore('training', {
  state: () => ({
    currentDetails: null as {
      ability: string;
      count: number;
      courses: string;
      personnelList: any[];
    } | null
  }),
  actions: {
    setCurrentDetails(details: {
      ability: string;
      count: number;
      courses: string;
      personnelList: any[];
    }) {
      this.currentDetails = details;
    },
    clearCurrentDetails() {
      this.currentDetails = null;
    }
  }
});