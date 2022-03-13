import { useEffect, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

function App() {
	const [user, setUser] = useState({
		name: "",
		bio: "",
		avatar: ""
	});
	const [repoData, setRepoData] = useState([]);
	const [repoData2, setRepoData2] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [newData, setNewData] = useState([]);
	console.log("state repoData", repoData);
	console.log("state repoData2", repoData2);
	// console.log("state newData", newData);
	const [toogle, setToogle] = useState(false);
	console.log("state repoData", repoData);
	const [screenSize, setScreenSize] = useState("sm");

	console.log("USE EFFECT: ");

	console.log("state repoData", repoData);
	console.log("state repoData2", repoData2);
	// function getNewData() {
	// }
	useEffect(() => {
		let results = repoData2.filter(
			({ id: id1 }) => !repoData.some(({ id: id2 }) => id2 === id1)
		);
		console.log("results", results);
		const resultsCut = results.slice(0, 5);
		setLoading(false);

		setRepoData((prev) => [...prev, ...resultsCut]);
	}, [repoData2]);

	const changeWindowSize = () => {
		if (window.innerWidth < 788) {
			setScreenSize("sm");
		} else if (window.innerWidth < 1200) {
			setScreenSize("md");
		} else {
			setScreenSize("lg");
		}
	};

	useEffect(() => {
		changeWindowSize();
		window.addEventListener("resize", changeWindowSize);
		return () => {
			window.removeEventListener("resize", changeWindowSize);
		};
	});
	// let timeout;

	// function myFunction() {
	// 	timeout = setTimeout(alertFunc, 1000);
	// }

	// function alertFunc() {
	// 	alert("Hello!");
	// }
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;
			// console.log("scrollable", scrollable);
			const scrolled = window.scrollY;
			// console.log("scrolled", scrolled);
			if (scrolled === scrollable) {
				console.log("scrolled");
				fetch("https://api.github.com/users/Brianrahmarela/repos")
					.then((res) => res.json())
					.then(
						(result) => {
							setLoading(true);

							var timeoutID = setTimeout(function () {
								console.log("setTimeout 5 secondi");
								setLoading(false);
							}, 5000);
							// console.log("REPO LIST RES 2!", result);
							let list2 = result.map((item) => {
								return {
									id: item.id,
									name: item.name,
									svn_url: item.svn_url
								};
							});
							console.log("list 2", list2);

							let filterList = list2.map((item, idx) => {
								return item;
							});
							// console.log("RESULT FILTER", filterList);
							setRepoData2(filterList);
							// getNewData();
							// const listCut = list.slice(0, 10);
						},
						(error) => {
							console.log(error);
						}
					);
			}
		});
	}, []);

	async function repoDataUrl() {
		setLoading(true);
		await fetch("https://api.github.com/users/Brianrahmarela/repos")
			.then((res) => res.json())
			.then(
				(result) => {
					console.log("REPO LIST RES", result);
					let list = result.map((item) => {
						return {
							id: item.id,
							name: item.name,
							svn_url: item.svn_url
						};
					});
					console.log("list", list);

					const listCut = list.slice(0, 5);
					console.log("listCut 1-5", listCut);
					if (toogle === false) {
						setRepoData(listCut);
						setToogle(true);
						setLoading(false);
					} else {
						setRepoData([]);
						setToogle(false);
						setLoading(false);
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		fetch("https://api.github.com/users/Brianrahmarela")
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
					setUser((prev) => ({
						...prev,
						name: result.name,
						bio: result.bio,
						avatar: result.avatar_url
					}));
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	return (
		<div
			className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column"
			style={{ backgroundColor: "#fafafa", padding: "80px" }}
		>
			<Card style={{ width: "18rem", marginBottom: "30px" }}>
				<Card.Img variant="top" src={user.avatar} />
				<Card.Body>
					<Card.Title style={{ fontWeight: "700" }}>{user.name}</Card.Title>
					<Card.Text>{user.bio}</Card.Text>
					{toogle ? (
						<Button variant="primary" onClick={repoDataUrl}>
							Hide
						</Button>
					) : (
						<Button variant="primary" onClick={repoDataUrl}>
							Show All Repository
						</Button>
					)}
				</Card.Body>
			</Card>
			{/* {loading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				""
			)} */}
			{repoData
				? repoData.map((item) => (
						<ListGroup
							className="text-align-center "
							style={{
								width:
									screenSize === "sm"
										? "288px"
										: screenSize === "md"
										? "500px"
										: "1000px"
							}}
						>
							{/* {repoData} */}
							<ListGroup.Item key={item.id}>
								<a href={item.svn_url}>{item.name}</a>
							</ListGroup.Item>
						</ListGroup>
				  ))
				: ""}
			{loading ? (
				<Spinner animation="border" role="status">
					<div className="visually-hidden">Loading...</div>
				</Spinner>
			) : (
				""
			)}
		</div>
	);
}

export default App;
