function filterByPrice(conditionStr, jsonArray) {
    let operator = '';
    let value = '';
    let isRange = false;
  
    if (conditionStr.includes('-')) {
      isRange = true;
      [value] = conditionStr.split('-');
    } else {
      [operator, value] = conditionStr.split(/([><])/).filter(Boolean);
    }
  
    const isPriceSatisfied = (price) => {
      if (isRange) {
        const [start, end] = conditionStr.split('-').map(parseFloat);
        return price >= start && price <= end;
      } else {
        switch (operator) {
          case '>':
            return price > parseFloat(value);
          case '<':
            return price < parseFloat(value);
          default:
            return false;
        }
      }
    };
  
    const filteredArray = jsonArray.filter((item) => isPriceSatisfied(item.price));
  
    return filteredArray;
  }

  

  const jsonArray = [
    {code: "A101", price : 150},
    {code: "A452", price : 450},
    {code: "B671", price : 52},
    {code: "H887", price : 17},
    {code: "V693", price : 188},
    {code: "A645", price : 306},
    {code: "J034", price : 109},
    {code: "N299", price : 75},
    {code: "M472", price : 250},
    {code: "R077", price : 300},
    {code: "B297", price : 150},
    {code: "A489", price : 160},
    {code: "A507", price : 25},
    {code: "K563", price : 45},
    {code: "M833", price : 80},
    {code: "T672", price : 100},
    {code: "B934", price : 200}
    ]
  
  const result1 = filterByPrice(">100", jsonArray); 
  const result2 = filterByPrice("<95", jsonArray); 
  const result3 = filterByPrice("0-75", jsonArray); 
  
  console.log(result1);
  console.log(result2);
  console.log(result3);

