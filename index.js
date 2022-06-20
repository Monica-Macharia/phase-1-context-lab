/* Your Code Here */
function createEmployeeRecord (item){
    return {
    firstName: item[0],
    familyName: item[1],
    title: item[2],
    payPerHour: item[3], 
    timeInEvents: [],
    timeOutEvents: []
}
}

let createEmployeeRecords = (employeeRecord) => {
    return employeeRecord.map(function(item){
        return createEmployeeRecord(item);
    })
}

let createTimeInEvent = function InUpdater(dateStamp){
    
    let [date, hour] = dateStamp.split(" ")
    
    this.timeInEvents.push({
        type: "TimeIn",hour: parseInt(hour, 10),date,
         })

 return this
}

let createTimeOutEvent = function outUpdater(dateStamp){
    
    let [date, hour] = dateStamp.split(" ")
    
    this.timeOutEvents.push({
        type: "TimeOut",hour: parseInt(hour, 10),date,
         })

 return this
}

let hoursWorkedOnDate = function(theDate){
    let dateIn = this.timeInEvents.find((target => target.date === theDate))
    let dateOut = this.timeOutEvents.find((target => target.date === theDate))
    return (dateOut.hour - dateIn.hour)/100
}

let wagesEarnedOnDate = function(newDate){
    return Number(hoursWorkedOnDate.call(this, newDate) * this.payPerHour)
} 



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const daysWorked = this.timeInEvents.map(function (target) {
        return target.date
    })

    const payable = daysWorked.reduce(function (history, days) {
        return history + wagesEarnedOnDate.call(this, days)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(array,firstName) {
    return array.find(function(namesOfEmployees)
    {return namesOfEmployees.firstName === firstName

})
}

let calculatePayroll = function(allRecords){
    return allRecords.reduce((history, namesOfEmployees) => history + allWagesFor.call(namesOfEmployees),0)
}