const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
  const choice = ['Deposit', 'Withdraw'];

  console.log(`ATM isDeposit: ${isDeposit}`);

  return (
    <label className='label huge'>
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input type='number' width='200' onChange={onChange}></input>
      <input type='submit' width='200' value='Submit' disabled={!validTransaction}></input>
    </label>
  );
};


const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  
  let accountStatus = `Account Balance: $ ${totalState}`;
  
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));

    if (Number(event.target.value <= 0)) {
      setValidTransaction(false);
    }else if (atmMode === "Withdraw" && Number(event.target.value > totalState)) {
      setValidTransaction(false);
      setShowAlert(true);
    }else {
      setValidTransaction(true);
      setShowAlert(false);
    };

    console.log(`valid: ${validTransaction}`);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);

    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value === "Deposit") setIsDeposit(true);
    if (event.target.value === "Withdraw") setIsDeposit(false);
    else return;
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
        <h2 id='total'>{accountStatus}</h2>
        <label>Select an action below to continue:</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode">
        <option value=""></option>
        <option value="Deposit">Deposit</option>
        <option value="Withdraw">Witdraw</option>
        </select>
        <br/>
        {atmMode &&
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>
        }
        {showAlert &&
          <p className="alert-message">Hold on! You only have ${totalState} in your account!</p>
        } 
    </form>
  );
};



//Renders app to the React DOM
ReactDOM.render(<Account />, document.getElementById('root'));