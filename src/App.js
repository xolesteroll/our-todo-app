import React from "react";

import TodosList from "./components/Todos/TodosList";
import Layout from "./components/UI/Layout/Layout";

function App() {
  return <Layout>
    <TodosList />
  </Layout>;
}

export default App;
