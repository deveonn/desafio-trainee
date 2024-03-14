import { useState } from "react";
import "../src/styles/App.css";
import Lottie from "lottie-react";
import MoneyFalling from "./assets/lotties/falling-money.json";
import { LottieStyle } from "./styles/LottieStyle.tsx";

interface Note {
  note: number;
  count: number;
}

function App() {
  const [cost, setCost] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [resultNotes, setResultNotes] = useState<Note[]>([]);

  const Calculate = () => {
    const costValue = Number(cost);
    const paymentValue = Number(payment);

    if (costValue > paymentValue) {
      alert("Valor de pagamento menor que o valor do produto!");
      return;
    } else if (
      isNaN(costValue) ||
      isNaN(paymentValue) ||
      costValue === 0 ||
      paymentValue === 0
    ) {
      alert("Favor verificar os campos, informações incorretas!");
      return;
    } else {
      const result = Number(payment) - Number(cost);
      const notesArray = [100, 10, 1];

      let remaining = result;
      const resultArray: Note[] = [];

      notesArray.forEach((note) => {
        const count = Math.floor(remaining / note);

        if (count > 0) {
          resultArray.push({ note, count });
          remaining -= count * note;
        }
      });

      setResultNotes(resultArray);
    }
  };

  return (
    <>
      <Lottie style={LottieStyle} animationData={MoneyFalling} />
      <div id="calculate">
        <h1>Calculadora de troco</h1>
        <fieldset>
          <p className="reais">Custo do produto:(R$)</p>
          <input
            type="number"
            name="cost"
            id="cost"
            onChange={(e) => setCost(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <p>Valor do pagamento:(R$)</p>
          <input
            type="number"
            name="payment"
            id="payment"
            onChange={(e) => setPayment(e.target.value)}
          />
        </fieldset>
        <button id="btn-calculate" onClick={Calculate}>
          Calcular
        </button>

        <div id="result">
          {resultNotes.map((item, index) => (
            <li key={index}>{`${item.count} notas de ${item.note}`}</li>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
