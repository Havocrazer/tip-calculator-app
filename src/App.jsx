import { useState, useEffect } from "react";
import "./App.css";
import icon_dollar from "./assets/icon_dollar.svg";
import icon_person from "./assets/icon_person.svg";

function App() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [validPeople, setValidPeople] = useState(true);

  const handleCalculate = (tipPercentage) => {
    if (bill > 0 && people > 0 && Number(bill) > 0 && Number(people) > 0) {
      const billNum = Number(bill);
      const peopleNum = Number(people);
      const selectedTip = customTip ? customTip / 100 : tipPercentage / 100;
      const tipPerPerson = (billNum * selectedTip) / peopleNum;
      const billAfterTip = (billNum * selectedTip + billNum) / peopleNum;
      setTipAmount(tipPerPerson || 0);
      setTotal(billAfterTip || 0);
    }
  };

  const handleReset = () => {
    setBill("");
    setPeople("");
    setCustomTip("");
    setTipAmount(0);
    setTotal(0);
    setValidPeople(true);
  };

  const handlePeopleChange = (e) => {
    const value = e.target.value;
    setPeople(value);
    setValidPeople(Number(value) > 0);
  };

  const handleTipButtonClick = (tipPercentage) => {
    if (!people) {
      setValidPeople(false);
    }
    setCustomTip("");
    handleCalculate(tipPercentage);
  };

  useEffect(() => {
    handleCalculate();
  }, [bill, people, customTip]);

  return (
    <div className="w-screen h-screen mx-auto flex flex-col bg-cyan-100 p-[10px] pb-[10px] justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[10px] h-[50px] text-teal-800 mb-[30px] font-bold text-[25px] tracking-[10px] lg:mb-[100px] lg:h-[20px]">
        <p>SPLI</p>
        <p>TTER</p>
      </div>
      <div className="flex flex-col justify-center w-[320px] h-[800px] shadow-xl bg-white rounded-3xl lg:flex-row lg:w-[780px] lg:h-[400px] lg:justify-between lg:p-[30px] lg:gap-8">
        <div className="flex flex-col gap-3 w-full justify-evenly p-[30px] lg:w-1/2 lg:p-0 ">
          <div className="flex flex-col relative gap-[10px]">
            <img
              src={icon_dollar}
              alt=""
              className="absolute top-[42px] left-[10px]"
            />
            <label
              htmlFor="bill"
              className="text-[14px] font-bold text-[#5e7a7d]"
            >
              Bill
            </label>
            <input
              type="text"
              id="bill"
              className="bg-gray-100 w-full h-[40px] text-right text-[24px] text-[#175851] font-bold px-[15px] placeholder:text-[#a4babc]  rounded-md hover:border-2 hover:border-teal-500 focus:outline-teal-500"
              placeholder="0"
              onChange={(e) => {
                setBill(e.target.value);
              }}
              value={bill}
            />
          </div>
          <div className="flex flex-col gap-[10px] text-[14px] font-bold text-[#5e7a7d]">
            <p>Select Tip %</p>
            <div className="grid grid-cols-2 gap-4 text-[20px] lg:grid-cols-3">
              <button
                onClick={() => {
                  handleTipButtonClick(5);
                }}
                className="bg-teal-900 h-[40px] flex justify-center items-center text-white rounded-md hover:bg-teal-300 hover:text-[#175851] focus:bg-teal-500 focus:text-[#175851]"
              >
                5%
              </button>
              <button
                onClick={() => {
                  handleTipButtonClick(10);
                }}
                className="bg-teal-900 h-[40px] flex justify-center items-center text-white rounded-md hover:bg-teal-300 hover:text-[#175851] focus:bg-teal-500 focus:text-[#175851]"
              >
                10%
              </button>
              <button
                onClick={() => {
                  handleTipButtonClick(15);
                }}
                className="bg-teal-900 h-[40px] flex justify-center items-center text-white rounded-md hover:bg-teal-300 hover:text-[#175851] focus:bg-teal-500 focus:text-[#175851]"
              >
                15%
              </button>
              <button
                onClick={() => {
                  handleTipButtonClick(25);
                }}
                className="bg-teal-900 h-[40px] flex justify-center items-center text-white rounded-md hover:bg-teal-300 hover:text-[#175851] focus:bg-teal-500 focus:text-[#175851]"
              >
                25%
              </button>
              <button
                onClick={() => {
                  handleTipButtonClick(50);
                }}
                className="bg-teal-900 h-[40px] flex justify-center items-center text-white rounded-md hover:bg-teal-300 hover:text-[#175851] focus:bg-teal-500 focus:text-[#175851]"
              >
                50%
              </button>
              <input
                type="text"
                className="bg-gray-100 h-[40px] w-full text-right px-[8px] text-[#175851] placeholder:text-[#a4babc] placeholder:text-center rounded-md hover:border-2 hover:border-teal-500 focus:outline-teal-500 hover:cursor-pointer"
                placeholder="Custom"
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  handleCalculate();
                }}
                value={customTip}
              />
            </div>
          </div>
          <div className="flex flex-col relative gap-[10px]">
            <img
              src={icon_person}
              alt=""
              className="absolute top-[42px] left-[10px]"
            />
            <label
              htmlFor="people"
              className="text-[14px] font-bold text-[#5e7a7d]"
            >
              Number of People
            </label>
            {!validPeople && (
              <p className="absolute right-[2px] text-[14px] font-bold text-orange-500">
                Can't be zero
              </p>
            )}
            <input
              type="text"
              id="people"
              className={`bg-gray-100 w-full h-[40px] text-right text-[24px] text-[#175851] font-bold px-[15px] placeholder:text-[#a4babc] rounded-md hover:border-2 hover:border-teal-500 focus:outline-teal-500 ${
                !validPeople
                  ? "border-2 border-orange-500 hover:border-2 hover:border-orange-500 focus:outline-orange-500 "
                  : ""
              }`}
              placeholder="0"
              onChange={handlePeopleChange}
              value={people}
            />
          </div>
        </div>
        <div className="flex flex-col full h-1/2 mx-[20px] mb-[10px] p-[20px] bg-teal-900 justify-between rounded-2xl lg:w-1/2 lg:h-full lg:mx-0 lg:justify-between lg:mb-0 lg:px-[30px] lg:pt-[40px]">
          <div className="flex flex-col gap-[20px] lg:gap-[40px]">
            <div className="flex w-full h-[40px] justify-between items-center">
              <div className="flex flex-col">
                <p className="text-white text-[14px] font-bold">Tip Amount</p>
                <p className="text-gray-400 text-[12px] font-bold">/ person</p>
              </div>
              <div className="flex">
                <p className="text-teal-300 font-bold text-[40px]">$</p>
                <div className="text-teal-300 font-bold text-[40px]">
                  {tipAmount.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex w-full h-[40px] justify-between items-center">
              <div className="flex flex-col">
                <p className="text-white text-[14px] font-bold">Total</p>
                <p className="text-gray-400 text-[12px] font-bold">/ person</p>
              </div>
              <div className="flex">
                <p className="text-teal-300 font-bold text-[40px]">$</p>
                <div className="text-teal-300 font-bold text-[40px]">
                  {total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-full h-[40px] bg-[#007177] text-[19px] rounded-md font-bold text-[#175851] hover:bg-teal-200 focus:bg-teal-400"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
