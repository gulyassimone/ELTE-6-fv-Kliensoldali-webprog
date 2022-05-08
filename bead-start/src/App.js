import {ScoringComponent} from "./scoring/ScoringComponent";
import json_data from "./stories/example-data/the-example";
import {Layout} from "./elem/Layout";
import cloneDeep from 'lodash/cloneDeep';
import { useState} from "react";

function App() {
    const [results, setResults] = useState([]);

    const onSubmit = async (actualRating) => {
        setResults(cloneDeep(actualRating));
        const element = document.createElement("a");
        const textFile = new Blob([[JSON.stringify({results:results})]], {type: 'text/plain'}); //pass data from localStorage API to blob
        element.href = URL.createObjectURL(textFile);
        element.download = "results.json";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    return (
        <Layout>
            <ScoringComponent
                criteria={json_data}
                results={results}
                onSubmit={onSubmit}
            />
        </Layout>
    );
}

export default App;
