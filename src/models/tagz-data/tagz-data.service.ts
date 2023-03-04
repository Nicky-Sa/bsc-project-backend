import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as process from "process";
import { FetchTagzDataService } from "@/models/fetch-tagz-data/fetch-tagz-data.service";

@Injectable()
export class TagzDataService {
  constructor(private fetchTagzDataService: FetchTagzDataService) {}

  private initAxios() {
    const headers = {
      Accept: 'application/json',
    };

    return axios.create({
      baseURL: process.env.API_DOMAIN,
      timeout: 31000,
      headers: headers,
    });
  }

  async numberOfTagz(username: string) {
    return await this.fetchTagzDataService.numberOfTagz(username);
  }

  async getBatteries(username: string) {
    const newData = (await this.initAxios().get('/mock/tagzBatteries.json')).data;
    return await this.fetchTagzDataService.addTagBatteryLevel(newData, username);
  }

  async getMessages(username: string) {
    const newData = (await this.initAxios().get("/mock/tagzMessages.json")).data;
    return await this.fetchTagzDataService.addTagMessage(newData, username);
  }

  async getLocations(username: string) {
    const newData = (await this.initAxios().get("/mock/tagzLocations.json")).data;
    return await this.fetchTagzDataService.addTagLocation(newData, username);
  }

  async getBalanceUsages(username: string) {
    const newData = (await this.initAxios().get("/mock/tagzBalanceUsages.json")).data;
    return await this.fetchTagzDataService.addTagBalanceUsage(newData, username);
  }
}
