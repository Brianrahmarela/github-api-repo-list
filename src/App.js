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

	const [toogle, setToogle] = useState(false);
	const [screenSize, setScreenSize] = useState("sm");

	useEffect(() => {
		let results = repoData2.filter(
			({ id: id1 }) => !repoData.some(({ id: id2 }) => id2 === id1)
		);
		const resultsCut = results.slice(0, 8);
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

	useEffect(() => {
		window.addEventListener("scroll", () => {
			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = window.scrollY;

			if (scrolled === scrollable) {
				//set timeout to looking simulation animation loading component when fetch data from api
				setTimeout(function () {
					fetch("https://api.github.com/users/Brianrahmarela/repos")
						.then((res) => res.json())
						.then(
							(result) => {
								let list2 = result.map((item) => {
									return {
										id: item.id,
										name: item.name,
										svn_url: item.svn_url
									};
								});

								let filterList = list2.map((item, idx) => {
									return item;
								});
								setRepoData2(filterList);
							},
							(error) => {
								console.log(error);
							}
						);
					setLoading(false);
				}, 1000);
			}
		});
	}, []);

	function repoDataUrl() {
		//infinite scroll animation loading with set timeout
		setLoading(true);
		setTimeout(function () {
			fetch("https://api.github.com/users/Brianrahmarela/repos")
				.then((res) => res.json())
				.then(
					(result) => {
						let list = result.map((item) => {
							return {
								id: item.id,
								name: item.name,
								svn_url: item.svn_url
							};
						});

						const listCut = list.slice(0, 8);
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
			setLoading(false);
		}, 200);
	}

	useEffect(() => {
		fetch("https://api.github.com/users/Brianrahmarela")
			.then((res) => res.json())
			.then(
				(result) => {
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
			style={{ backgroundColor: "#fafafa", padding: "80px 80px 80px 80px" }}
		>
			<Card
				style={{ width: "18rem", marginBottom: "50px", paddingBottom: "20px" }}
			>
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
							<ListGroup.Item key={item.id} style={{ padding: "20px 20px" }}>
								<a href={item.svn_url}>{item.name}</a>
							</ListGroup.Item>
						</ListGroup>
				  ))
				: ""}
			{/* <p>loading...</p> */}
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
