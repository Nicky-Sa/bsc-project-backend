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

  async getBatteries() {
    const newData = (await this.initAxios().get('/mock/tagzBatteries.json')).data;
    await this.fetchTagzDataService.addBatteryLevel(newData);
    return true;
  }
}
