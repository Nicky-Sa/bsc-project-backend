import { Controller, Get, UseGuards } from "@nestjs/common";
import { TransactionsService } from "models/transactions/transactions.service";
import { GetUser } from "@/models/auth/decorator";
import { PartialUser } from "@/models/user/entities";
import { JwtGuard } from "@/models/auth/guard";

@UseGuards(JwtGuard) // a guard for the controller
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {
  }

  @Get("/all")
  async findAll(@GetUser() user: PartialUser) {
    const data = await this.transactionsService.getAll(user.username);
    return {
      data,
      message: "ok"
    };
  }
}
