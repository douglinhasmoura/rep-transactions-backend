import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string,
  value: number,
  type:  'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    // TODO

    const balance = this.transactionsRepository.getBalance();

    if(value > balance.total && type == "outcome"){
      throw Error("Not validate")
    }

   const transaction = this.transactionsRepository.create({
     title,
     type,
     value
   });

   return transaction;


  }
}

export default CreateTransactionService;
