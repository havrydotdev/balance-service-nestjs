import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TRANSACTIONS_REPOSITORY } from '../../constants.js';
import Transaction from '../entities/transaction.entity.js';
import { UsersService } from '../../users/services/users/users.service.js';
import { SaveOptions } from 'sequelize';

@Injectable()
export default class TransactionsHooks implements OnModuleInit {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepo: typeof Transaction,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    this.transactionsRepo.afterSave(
      'update_balance',
      async (trs: Transaction, options: SaveOptions<Transaction>) => {
        if (!options.validate) {
          return;
        }

        const rowsAffected = await this.usersService.updateBalance(
          trs.userId,
          trs.value,
        );

        if (rowsAffected === 0) {
          const rowsAff = await this.transactionsRepo.destroy({
            where: {
              id: trs.id,
            },
          });
          if (rowsAff === 0) {
            throw new Error(
              'No rows affected during balance update and failed to delete transaction',
            );
          }

          throw new Error('No rows affected during balance update');
        }
      },
    );
  }
}
