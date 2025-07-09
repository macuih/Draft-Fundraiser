import React, { useState, useEffect } from "react";
import FactoryContract from "./contracts/Factory.json";
import Web3 from "web3";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import NewFundraiser from './NewFundraiser';
import Home from './Home';
import Receipts from './Receipts';

import "./App.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const App = () => {
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(
          new Web3.providers.HttpProvider("http://ec2-3-129-52-168.us-east-2.compute.amazonaws.com:8545")
        );

        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork.address
        );

        setState({ web3, accounts, contract: instance });
      } catch (error) {
        alert("Failed to load web3, accounts, or contract. Check console for details.");
        console.error(error);
      }
    };

    init();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ marginRight: 20 }}>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </Typography>
            <NavLink className="nav-link" to="/new/">New</NavLink>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new/" element={<NewFundraiser />} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
