// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
function App() {
	const [user, setUser] = useState({
		name: "",
		bio: "",
		avatar: ""
	});
	console.log("state user", user);
	const [repoData, setRepoData] = useState();
	console.log("state repoData", repoData);

	async function repoDataUrl() {
		await fetch("https://api.github.com/users/Brianrahmarela/repos")
			.then((res) => res.json())
			.then(
				(result) => {
					console.log("REPO LIST RES", result);
					const list = result.map((item, index) => (
						<>
							<ListGroup
								key={index}
								className="text-align-center "
								style={{ width: "500px" }}
							>
								<ListGroup.Item>
									<a href={item.svn_url}>{item.name}</a>
								</ListGroup.Item>
							</ListGroup>
						</>
					));
					console.log("list res", list);
					setRepoData(list);
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
					<Card.Title>{user.name}</Card.Title>
					<Card.Text>{user.bio}</Card.Text>
					<Button variant="primary" onClick={repoDataUrl}>
						Get All List Repository
					</Button>
				</Card.Body>
			</Card>
			{repoData ? (
				<>
					<h4>List Repository</h4>
					{repoData}
				</>
			) : (
				""
			)}
		</div>
	);
}

export default App;
