class Calculator extends React.Component {
  state = {
    currentInput: '0',
    operator: null,
    previousValue: null,
    waitingForOperand: false,
    error: false
  };

  inputDigit = (digit) => {
    const { currentInput, waitingForOperand } = this.state;
    
    if (waitingForOperand) {
      this.setState({
        currentInput: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        currentInput: currentInput === '0' ? String(digit) : currentInput + digit
      });
    }
  };

  inputDecimal = () => {
    const { currentInput, waitingForOperand } = this.state;
    
    if (waitingForOperand) {
      this.setState({
        currentInput: '0.',
        waitingForOperand: false
      });
      return;
    }

    if (currentInput.indexOf('.') === -1) {
      this.setState({
        currentInput: currentInput + '.',
        waitingForOperand: false
      });
    }
  };

  clearInput = () => {
    this.setState({
      currentInput: '0',
      operator: null,
      previousValue: null,
      waitingForOperand: false,
      error: false
    });
  };

  performOperation = (nextOperator) => {
    const { currentInput, previousValue, operator } = this.state;
    const inputValue = parseFloat(currentInput);

    if (previousValue === null) {
      this.setState({
        previousValue: inputValue,
        waitingForOperand: true,
        operator: nextOperator
      });
    } else if (operator) {
      const result = this.calculate(previousValue, inputValue, operator);
      
      this.setState({
        currentInput: String(result),
        previousValue: result,
        waitingForOperand: true,
        operator: nextOperator
      });
    }
  };

  calculate = (firstOperand, secondOperand, operation) => {
    try {
      switch (operation) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '×':
          return firstOperand * secondOperand;
        case '÷':
          if (secondOperand === 0) {
            this.setState({ error: true });
            return 0;
          }
          return firstOperand / secondOperand;
        default:
          return secondOperand;
      }
    } catch {
      this.setState({ error: true });
      return 0;
    }
  };

  handleEquals = () => {
    const { currentInput, previousValue, operator } = this.state;
    
    if (previousValue !== null && operator !== null) {
      const inputValue = parseFloat(currentInput);
      const result = this.calculate(previousValue, inputValue, operator);
      
      this.setState({
        currentInput: String(result),
        previousValue: null,
        waitingForOperand: true,
        operator: null
      });
    }
  };

  render() {
    const { currentInput, error } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className={`p-4 text-right text-3xl ${error ? 'text-red-500' : 'text-gray-800'}`}>
            {error ? 'خطا!' : currentInput}
          </div>
          
          <div className="grid grid-cols-4 gap-1 p-2 bg-gray-200">
            {/* Row 1 */}
            <button onClick={this.clearInput} className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded">
              پاک کردن
            </button>
            <button onClick={() => this.performOperation('÷')} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded">
              ÷
            </button>
            <button onClick={() => this.performOperation('×')} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded">
              ×
            </button>

            {/* Row 2 */}
            <button onClick={() => this.inputDigit(7)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              7
            </button>
            <button onClick={() => this.inputDigit(8)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              8
            </button>
            <button onClick={() => this.inputDigit(9)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              9
            </button>
            <button onClick={() => this.performOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded">
              -
            </button>

            {/* Row 3 */}
            <button onClick={() => this.inputDigit(4)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              4
            </button>
            <button onClick={() => this.inputDigit(5)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              5
            </button>
            <button onClick={() => this.inputDigit(6)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              6
            </button>
            <button onClick={() => this.performOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded">
              +
            </button>

            {/* Row 4 */}
            <button onClick={() => this.inputDigit(1)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              1
            </button>
            <button onClick={() => this.inputDigit(2)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              2
            </button>
            <button onClick={() => this.inputDigit(3)} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              3
            </button>
            <button onClick={this.handleEquals} className="row-span-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded">
              =
            </button>

            {/* Row 5 */}
            <button onClick={() => this.inputDigit(0)} className="col-span-2 bg-gray-300 hover:bg-gray-400 p-4 rounded">
              0
            </button>
            <button onClick={this.inputDecimal} className="bg-gray-300 hover:bg-gray-400 p-4 rounded">
              .
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));