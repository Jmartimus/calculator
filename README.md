Thanks for checking out my Calculator app.

This app was a 'work in progress' for a long time and required several refactors.  I am extremely excited to have finally completed it.

It uses a little bit of React for the useRef hook and to display jsx, but it is mostly just javascript logic.

Although this is technically a React project, I left it all in one component because this was originally created in Codepen to partially fulfill the requirements for the front end libraries certificate.

I have left comments in the Calculator.js component to guide you on how the information is passed through all the functions, but I will also add some steps below to help you understand the logic.

1. A button is clicked.
2. OnClick the value of the button is passed to the whatWasClicked function and directed toward the function that will handle it. This is the first filter.
3. If the value is a number, it will be sent to the inputDigit function. If the value is a decimal, it will be sent to the inputDecimal function. If the value is an operator (+, -, *, /, =), it will be sent to the handleOperator function.
4. Within the handleOperator function, there is a conditional statement that will send everything to the calculate function if the conditions are right.
5. The calculate function will return its result to the handleOperator function where it will be assigned to the display and the equation ends its journey there.
6. There is also an allClear function that clears the whole calc object and resets the values back to default.

Potential future enhancements: Clear button, Percentages, and positive/negative button.

If you have any suggestions or comments, please let me know!!