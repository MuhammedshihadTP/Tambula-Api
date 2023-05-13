
const generateTickets = () => {
  const rows = 3;
  const cols = 9;
  const numCells = rows * cols;
  const numTickets = 6;

  const nums = Array.from(Array(90), (_, i) => i + 1);
  
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // Divide the shuffled array into 9 columns
  const columns = Array.from(Array(cols), (_, i) => {
    const start = i * rows;
    const end = start + rows;
    return nums.slice(start, end);
  });
  // Transpose the columns into rows
  const rowsArr = Array.from(Array(rows), () => Array(cols).fill(0));
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rowsArr[j][i] = columns[i][j];
    }
  }
  // Generate tickets with the rows
  const tickets = Array.from(Array(numTickets), () => {
    const ticket = Array.from(Array(rows), () => Array(cols).fill(0));
    const used = new Set();

    for (let i = 0; i < cols; i++) {
      const start = i * rows;
      const end = start + rows;
      const col = rowsArr.slice(start, end);

      // Choose 5 unique numbers for the column
      const choices = col.reduce((acc, curr) => {
        curr.forEach((num) => {
          if (!used.has(num)) acc.push(num);
        });
        return acc;
      }, []);
      for (let j = 0; j < rows; j++) {
        if (choices.length > 0) {
          const index = Math.floor(Math.random() * choices.length);
          ticket[j][i] = choices[index];
          used.add(choices[index]);
          choices.splice(index, 1);
        } else {
          ticket[j][i] = 0;
        }
      }
    }
    return ticket;
  });

  return tickets;
};
module.exports = generateTickets;
