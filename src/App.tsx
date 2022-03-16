/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
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
  const [store, setStore] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    onValue(ref(db, "store/"), (snapshot) => {
      const storeFirebase: any[] = snapshot.val();
      setStore(
        !_.isEmpty(storeFirebase)
          ? Object.entries(storeFirebase)?.map(([key, item]) => {
              return { ...item, title: key };
            })
          : []
      );
    });
    onValue(ref(db, "types/"), (snaphost) => {
      const typesFirebase: any[] = snaphost.val();
      setOptions(
        Object.entries(typesFirebase)?.map(([key, item]) => {
          return { value: key, title: item };
        })
      );
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Products store={store} options={options} />
    </div>
  );
}

export default App;
