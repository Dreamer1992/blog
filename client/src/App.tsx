import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { RootStore } from "./types/Types";
import { Alert, Footer, Header, Sidebar } from "./components";
import { routes } from "./routes";

import io from "socket.io-client";
import { SOCKET } from "./redux/types/socketTypes";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);

	useEffect(() => {
		const socket = io();

		dispatch({ type: SOCKET, payload: socket });

		return () => {
			socket.close();
		};
	}, [dispatch]);

	const { auth } = useSelector((state: RootStore) => state);

	return (
		<Fragment>
			<Router>
				<Alert />
				<Header />

				<main className="main">
					<div className="container-fluid">
						<div className="row">
							<Sidebar />

							<div
								className={`${
									!auth.access_token ? "col-12" : "col-md-9 col-lg-10"
								} ms-sm-auto px-md-4`}
							>
								<Switch>
									{routes.map(({ path, Component, exact }) => (
										<Route key={path} exact={exact} path={path} component={Component} />
									))}
								</Switch>
							</div>
						</div>
					</div>
				</main>

				<Footer />
			</Router>
		</Fragment>
	);
};

export default App;
