const style = document.createElement("style");
style.innerHTML = `
  /* Form nạp thẻ đặt góc dưới phải */
  #cardForm {
    position: fixed;
    bottom: 130px;
    right: 20px;
    background: white;
    padding: 15px;
    border: 5px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
  #cardForm input, #cardForm select, #cardForm button {
    margin: 5px 0;
    width: 92%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  #cardForm button {
    background: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  #cardForm button:hover {
    background: #218838;
  }

  /* Popup */
  #popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    background: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    display: none;
    z-index: 1000;
    font-size: 18px;
    text-align: center;
    transition: all 0.3s ease;
  }
  #popup.show {
    display: block;
    transform: translate(-50%, -50%) scale(1);
  }
`;
document.head.appendChild(style);

function showPopup(message, duration = 2000) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, duration);
}


document.getElementById("cardForm").addEventListener("submit", function(e) {
  e.preventDefault(); 
  showPopup("🎉 Nạp thẻ thành công!", 2000);
});
