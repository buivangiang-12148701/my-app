import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    login,
    selectAccessToken,
    selectError,
    selectLoading,
    selectRefreshToken
} from "./stores/reducers/token.reducer";
import {Loading} from "./constants/loading";
import {getAllCustomer, selectCustomers} from "./stores/reducers/customer.reducer";
import {clientAuthentication} from "./apis/base.api";

function App() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const accessToken = useSelector(selectAccessToken);
    const refreshToken = useSelector(selectRefreshToken);
    const customers = useSelector(selectCustomers);

    const _bindAPILogin = async () => {
        return await dispatch(login({username: 'giangbv@qi.com.vn', password: '123456'})).unwrap();
    }

    const _bindGetAllCustomer = async () => {
        return await dispatch(getAllCustomer()).unwrap();
    }
    useEffect(() => {
        _bindAPILogin();
        setTimeout(() => {
            _bindGetAllCustomer();
        }, 2000);

        setTimeout(() => {
            const access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjk4YjAxZjc5OWUyNDI3MTEzNjUxNiIsInVzZXJfbmFtZSI6ImdpYW5nYnZAcWkuY29tLnZuIiwiZW1wbG95ZWUiOiI2MWJjNjQzYTZlMTY4ZWQzZTRiYjZkNGQiLCJjdXN0b21lciI6IjYxYjk4NWE3YTZmZWYyYTRjMmU4ZDZiNSIsImlhdCI6MTYzOTkzNzcxMSwiZXhwIjoxNjM5OTM4MzExfQ.WPEhnLAxC11HUtke9-tsSWQqThZy-mYpR3lPjvdRNo20b7oeb4bXjkpCW750RgrZxdXOtEDBkla-GBf88cd3zA2-wtb2htHbrkmFSfgO1lK_WCndXqd63un0VgoL4KbnUbPxdO1Wz3nMMyrEi4iPN6-_KDoO5L8zO-BcjptXqScqWd3bCcU7SG6UzaeLtHSgKm7M3vfKoUagc0CojJ6S_NBOhkIsZeIozIiAkQkCLsmWiDJCkNdiA_MkIjYWYR5G_In0a72FGd995YeX09Z2M3ORdCQ08ZaI63yHcbHrFaoPYYiJZsBl1zuduudw749AiPQZKkdjTZ-A3UePK8r1YA";
            clientAuthentication.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            _bindGetAllCustomer();
        }, 5000);
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>Show Loading: {loading === Loading.pending ? 'true' : 'false'}</p>
                <p>Error: {error}</p>
                <p>Access Token: {accessToken}</p>
                <p>Refresh Token: {refreshToken}</p>
                <p>Show list customer: {JSON.stringify(customers)}</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
