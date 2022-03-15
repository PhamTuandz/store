import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./module/firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";
import Products from "./containers/Products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

export interface ITutorialData {
  key?: string | null;
  title: string;
  description: string;
  published?: boolean;
}

function App() {
  const starCountRef = ref(db, "store/");

  const [store, setStore] = useState<any>([]);

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const storeFirebase: any[] = snapshot.val();
      setStore(Object.values(storeFirebase));
    });
  }, []);

  return (
    <div className="App">
      <button onClick={notify}>Notify!</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Products store={store} />
    </div>
  );
}

export default App;
