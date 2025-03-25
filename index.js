// Your code here
// Create Employee Record
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Create Employee Records from an Array of Arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
  }
  
  // Add Time In Event
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  // Add Time Out Event
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  // Calculate Hours Worked on Date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour / 100) - (timeIn.hour / 100); // Convert to hours
    }
    return 0;
  }
  
  // Calculate Wages Earned on Date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Aggregate All Wages for an Employee
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
  }
  
  // Calculate Payroll for All Employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Example Usage:
  // Test data
  const employeesData = [
    ["Loki", "Odinson", "God of Mischief", 27],
    ["Natalia", "Romanoff", "Super Spy", 45]
  ];
  const employees = createEmployeeRecords(employeesData);
  
  // Adding time events
  createTimeInEvent(employees[0], "2025-03-25 0800");
  createTimeOutEvent(employees[0], "2025-03-25 1000");
  createTimeInEvent(employees[1], "2025-03-25 0900");
  createTimeOutEvent(employees[1], "2025-03-25 1100");
  
  // Calculate payroll
  console.log("Payroll:", calculatePayroll(employees)); // Example output
  