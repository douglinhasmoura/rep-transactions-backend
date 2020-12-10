import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request{
  title: string,
  value: number,
  type:  'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    if(this.transactions.length == 0){
      const balance: Balance = {
        income: 0,
        outcome: 0,
        total: 0
      }

      return balance;
    }
    let totalBalance = this.transactions.map(trans =>{
      return trans.value;
    });

    let incomeBalance = this.transactions.filter(trans =>{
      return trans.type == "income" ? trans : null
    })

    let outcomeBalance = this.transactions.filter(trans =>{
      return trans.type == "outcome" ? trans  : null
    })

    let incomes = incomeBalance.map(item =>{
      return item.value;
    })

    let outcomes = outcomeBalance.map(item =>{
      return item.value;
    })

    if(totalBalance.length == 0){
      totalBalance.push(0);
    }

    if(incomes.length == 0){
      incomes.push(0);
    }

    if(outcomes.length == 0){
      outcomes.push(0);
    }

    const income = incomes.reduce( (accum, curr) => accum + curr );
    const outcome = outcomes.reduce( (accum, curr) => accum + curr );
    const total = income - outcome;

    const balance: Balance = {
      income: income,
      outcome: outcome,
      total: total
    };

    return balance;

    // const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    // this.values.reduce(reducer);
    
  }

  public create({title, type, value }:Request): Transaction {
    // TODO
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
