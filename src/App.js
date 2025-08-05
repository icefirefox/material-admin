// src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "./authProvider";
import MaterialList from "./pages/Material/MaterialList";
import MaterialEdit from "./pages/Material/MaterialEdit.tsx";
import MaterialCreate from "./pages/Material/MaterialCreate.tsx";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import BuildIcon from "@mui/icons-material/Build";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CustomLayout from './components/Layout.tsx';
import CustomLayoutWrapper from './components/CustomLayoutWrapper.tsx';

import BomList from "./pages/BOM/BomList.tsx";
import BomCreate from "./pages/BOM/BomCreate.tsx";
import BomEdit from "./pages/BOM/BomEdit.tsx";

import theme from "./theme";
const fetchJsonWithAuth = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  // 添加错误处理
  return fetchUtils.fetchJson(url, options).catch((error) => {
    const status = error.status || (error.response && error.response.status);

    if (status === 401 || status === 403) {
      return Promise.reject({ status, message: 'Unauthorized' });
    }

    if (error instanceof TypeError) {
      return Promise.reject({ status: 0, message: 'Network error or server down' });
    }

    return Promise.reject(error);
  });
};

const dataProvider = simpleRestProvider("http://localhost:5180/api", fetchJsonWithAuth); // 后端 API 地址

const App = () => (
  <Admin
    theme={theme}
    layout={CustomLayout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    // 禁用 react-query 自动重试机制
    queryClientOptions={{
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }}
  >
    <Resource icon={Inventory2Icon} name="Materials" list={(props) => (
      <CustomLayoutWrapper>
        <MaterialList {...props} />
      </CustomLayoutWrapper>
    )} create={MaterialCreate}
      edit={MaterialEdit} options={{ label: "Items" }} />
    <Resource icon={WarehouseIcon} name="Stock" list={ListGuesser} />
    <Resource icon={ReceiptLongIcon} name="Sales" options={{ label: "Sales Order" }} list={ListGuesser} />
    <Resource icon={AssignmentIcon} name="MaterialRequest" options={{ label: "Material Request" }} list={ListGuesser} />
    <Resource icon={BusinessIcon} name="Supplier" options={{ label: "Supplier" }} list={ListGuesser} />

    <Resource icon={BuildIcon} name="BOM"
      list={BomList}
      create={BomCreate}
      edit={BomEdit} />

  </Admin>
);

export default App;
