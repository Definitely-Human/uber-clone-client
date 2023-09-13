import { useState } from "react";
import LoggedOutRouter from "./routers/logged-out-router";

function App() {
    const [count, setCount] = useState(0);

    return <LoggedOutRouter />;
}

export default App;
