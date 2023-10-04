import numbro from "numbro";

export const formatPieData = (data = [], expenseType: any[]) => {
    let byType = {};
    data.map((record) => {
      if (!byType?.[record.type]) {
        byType[record.type] = 0;
      }
  
      byType[record.type] = byType[record.type] + record.total;
    });
    return Object.entries(byType).map(([key, value]) => ({
      label: expenseType.find((item) => item.value === key)?.label,
      total: value,
    }));
  };
  
  
  
  export const getChickPrice = (data, total, pieData) => {
    const amortization =
      pieData.find((item) => item.label === "Depense d'amortissement")?.total ||
      0;
    const totalWithoutExpenses = total - amortization;
    const chicks = data?.find((item) => item.type === "chicks")?.quantity;
    return numbro(totalWithoutExpenses / chicks).format({ mantissa: 0 });
  };

  export const getTotalSales = (data) => { 
    if(!data) return 0;
    return data.reduce((prev, curr) => prev + (curr?.price * curr?.quantity),0)
   }