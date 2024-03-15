import { useState } from "react";
import "../src/styles/App.css";
import Lottie from "lottie-react";
import MoneyFalling from "./assets/lotties/falling-money.json";
import { LottieStyle } from "./styles/LottieStyle.tsx";
import { NumericFormat } from "react-number-format"

interface Note {
  note: number;
  count: number;
}

function App() {
  const [cost, setCost] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [resultNotes, setResultNotes] = useState<Note[]>([]);
  const [total, setTotal] = useState('0')

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
      setTotal(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
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
        <h1>Calculadora de Troco</h1>
        <p id="description">Informe o valor da compra e o dinheiro do pagamento para o calculo de troco.</p>
        <fieldset>
        <p className="reais">Custo do produto:(R$)</p>
         <NumericFormat
          thousandSeparator = "."
          decimalSeparator = ","
          value={cost}
          onValueChange={(values) => {
            const { value } = values
            setCost(value)
          }}
         />
        </fieldset>
        <fieldset>
          <p>Valor do pagamento:(R$)</p>
          <NumericFormat
          thousandSeparator = "."
          decimalSeparator = ","
          value={payment}
          onValueChange={(values) => {
            const { value } = values
            setPayment(value)
          }}
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

        <p id="total"><strong>Total: </strong> R$ {total}</p>
      </div>

      <footer>
        <a href="https://github.com/deveonn/desafio-trainee" target="_blank">
          <img id="github-icon"src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Icon" />
          <p>Código do Projeto</p>
        </a>
      </footer>
    </>
  );
}

export default App;
