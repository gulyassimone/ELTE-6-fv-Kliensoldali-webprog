import {ScoringComponent} from "./scoring/ScoringComponent";
import json_data from "./stories/example-data/the-example";
import {Layout} from "./Layout/Layout";

function App() {
    return (
        <Layout>
            <ScoringComponent
                criteria={json_data}
                onSubmit={results => console.log(results)}
                onCancel={draft => console.log(draft)}
            />
        </Layout>
    );
}

export default App;
