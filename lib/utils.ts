import moment from "moment";

const addSpaceEveryTwoDigits = (number: number) => {
    // Convert the number to a string
    const numberString = number.toString();
  
    // Split the string into an array of two-digit substrings
    const substringsArray = numberString.match(/.{1,2}/g);
  
    // Join the substrings with a space between each substring
    const numberWithSpaces = substringsArray?.join(' ');
  
    return numberWithSpaces;
  }

  export const groupBy = (
    data: Record<string, any>[] = [],
    key: string,
    sumKey: string
  ) => {
    return data.reduce((acc, obj) => {
      const item = obj[key];
      if (!acc[item]) {
        acc[item] = {
          data: [],
          [sumKey]: 0,
        };
      }
      acc[item].data.push(obj);
      acc[item][sumKey] += obj[sumKey];
      return acc;
    }, {});
  };
  
  export const getExpenses = (
    expenses: Record<string, any>,
    sales: Record<string, any>,
    records: Record<string, any>[] = []
  ) => {
    return records.map((record) => {
      const expense = expenses[record.id]?.total || 0;
      const salesTotal = sales[record.id]?.amountPaid || 0;
      const diff = salesTotal - expense; 
      const priceTotal = sales[record.id]?.data.reduce((acc: number, obj: Record<string, any>) => acc + obj.price, 0);
      const meanPrice = priceTotal / sales[record.id]?.data.length || null;
      return {
        name: moment(record.date).format("DD MMM"),
        quantity: record.quantity,
        depenses: expense,
        revenue: salesTotal,
        date: moment(record.date).format("DD MMM"),
        timestamp: record.date,
        profit: (diff > 0 && salesTotal) ? diff : 0,
        perte: (diff < 0 && salesTotal) ? diff : 0,
        "prix moyen": meanPrice,
      };
    });
  };


  export const employeeCost = () => {
    const salaryPerMonth = 50000;
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const monthsElapsed = (today.getFullYear() - startOfYear.getFullYear()) * 12 + (today.getMonth() - startOfYear.getMonth());
    const totalSalary = (monthsElapsed + 1) * salaryPerMonth;
    return totalSalary;
  };