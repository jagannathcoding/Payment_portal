import React, { useState, useRef } from "react";
import "./styles.css"; 

const App = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");

  // Card Payment State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holderName: "",
    saveCard: false,
  });

  // Net Banking State
  const [netBankingDetails, setNetBankingDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  // Refs for auto-focus
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const nameRef = useRef(null);
  const ifscRef = useRef(null);

  // Handle Card Number Input with formatting and auto-focus
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardDetails({ ...cardDetails, cardNumber: formattedValue });

    if (value.length === 16) expiryRef.current?.focus();
  };

  // Handle Expiry Date Input
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardDetails({ ...cardDetails, expiry: value });

    if (value.length === 5) cvvRef.current?.focus();
  };

  // Handle CVV Input
  const handleCVVChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCardDetails({ ...cardDetails, cvv: value });

    if (value.length === 3) nameRef.current?.focus();
  };

  // Handle Net Banking Inputs
  const handleNetBankingChange = (e) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      let formattedValue = value.replace(/\D/g, "").slice(0, 16);
      setNetBankingDetails({ ...netBankingDetails, accountNumber: formattedValue });

      if (formattedValue.length === 16) ifscRef.current?.focus();
    } else {
      setNetBankingDetails({ ...netBankingDetails, [name]: value });
    }
  };

  return (
    <div className="payment-container">
      {/* Merchant Details */}
      <div className="merchant-info">
        <div>
          <p className="merchant-name">Merchant: XYZ Pvt. Ltd.</p>
          <p className="order-id">Order ID: 1234567890</p>
        </div>
      </div>




      {/* Payment Method Tabs */}
      <div className="payment-methods">
        {["card", "netbanking", "upi", "wallet", "qr"].map((method) => (
          <button
            key={method}
            className={selectedMethod === method ? "active" : ""}
            onClick={() => setSelectedMethod(method)}
          >
            {method === "card" && "Credit/Debit Card"}
            {method === "netbanking" && "Net Banking"}
            {method === "upi" && "UPI"}
            {method === "wallet" && "Wallets"}
            {method === "qr" && "QR Code"}
          </button>
        ))}
      </div>





      {/* Card Payment Form */}
      {selectedMethod === "card" && (
        <>
          <h2 className="payment-title">Enter Card Details</h2>

          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Expiry (MM/YY)</label>
              <input
                type="text"
                maxLength="5"
                ref={expiryRef}
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
              />
            </div>

            <div className="input-group">
              <label>CVV</label>
              <input
                type="password"
                maxLength="3"
                ref={cvvRef}
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleCVVChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              ref={nameRef}
              placeholder="John Doe"
              value={cardDetails.holderName}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, holderName: e.target.value })
              }
            />
          </div>

          <div className="save-card">
            <input
              type="checkbox"
              checked={cardDetails.saveCard}
              onChange={() =>
                setCardDetails({ ...cardDetails, saveCard: !cardDetails.saveCard })
              }
            />
            <label>Save this card for future payments</label>
          </div>
        </>
      )}





      {/* Net Banking Form */}
      {selectedMethod === "netbanking" && (
        <>
          <h2 className="payment-title">Enter Net Banking Details</h2>

          <div className="input-group">
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={netBankingDetails.bankName}
              onChange={handleNetBankingChange}
              placeholder="Bank Name"
            />
          </div>

          <div className="input-group">
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={netBankingDetails.accountNumber}
              onChange={handleNetBankingChange}
              placeholder="Enter 16-digit Account Number"
              maxLength="16"
            />
          </div>

          <div className="input-group">
            <label>IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              ref={ifscRef}
              value={netBankingDetails.ifscCode}
              onChange={handleNetBankingChange}
              placeholder="IFSC Code"
            />
          </div>
        </>
      )}

      {/* Payment Button */}
      <button className="pay-btn">Make Payment</button>
    </div>
  );
};

export default App;
