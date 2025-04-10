import { Injectable } from '@nestjs/common';
import { ENV } from '../config/environment.config';
import axios from "axios";
@Injectable()
export class BreedApi {
   private readonly catApiUrl = ENV.BREEDS_API;
   private readonly apiKey = ENV.BREEDS_API_KEY

   constructor() { }

   getAllBreeds() {
      const options = {
         method: 'GET',
         url: `${this.catApiUrl}/breeds`,
         headers: {
            'x-api-key': this.apiKey,
            mode: 'cors'
         }
      };
      return axios.request(options).then(function (response) {
         return response.data
      }).catch(function (error) {
         console.error(error);
      });
   }

   getBreedById(id: string) {
      
      const options = {
         method: 'GET',
         url: `${this.catApiUrl}/breeds/${id}`,
         headers: {
            'x-api-key': this.apiKey,
            mode: 'cors'
         }
      };
      return axios.request(options).then(function (response) {
         return response.data
      }).catch(function (error) {
         console.error(error);
      });
   }

   getBreedBySearch(search: string) {
      const options = {
         method: 'GET',
         url: `${this.catApiUrl}/breeds/search?q=${search}`,
         headers: {
            'x-api-key': this.apiKey,
            mode: 'cors'
         }
      };
      return axios.request(options).then(function (response) {
         return response.data
      }).catch(function (error) {
         console.error(error);
      });
   }


   getBreedByImages(search: string) {
      const options = {
         method: 'GET',
         url: `${this.catApiUrl}/images/search?limit=10&breed_ids=${search}`,
         headers: {
            'x-api-key': this.apiKey,
            mode: 'cors'
         }
      };
      return axios.request(options).then(function (response) {
         return response.data
      }).catch(function (error) {
         console.error(error);
      });
   }
}
