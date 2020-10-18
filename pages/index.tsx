import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import { print } from "graphql/language/printer";
import { format } from "date-fns";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prismStyle from "react-syntax-highlighter/styles/prism/base16-ateliersulphurpool.light";
import DarkModeToggle from "../components/DarkModeToggle";
import YingYang from "../components/svg-icons/YinYang";
const ResumeQuery = gql`
	query {
		bio {
			name
			tagline
			linkedin
			github
			email
			medium
		}
		positions {
			id
			title
			startDate
			endDate
			years
			months
			achievements
			company
			location
		}
	}
`;

export default function Home() {
	const { data, error, loading } = useQuery(ResumeQuery);
	if (error) {
		return <span>Error... oops!</span>;
	}
	if (loading)
		return (
			<header className="loading">
				<YingYang width="50px" height="50px" />
			</header>
		);

	const { bio, positions } = data;
	return (
		<div className="container">
			<Head>
				<title>ryuki-resume</title>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐉</text></svg>"
				/>
			</Head>
			<header className="header">
				<DarkModeToggle />
			</header>
			<div className="split">
				<div className="left">
					<h1>{bio.name}</h1>
					<h2>{bio.tagline}</h2>
					<h2>Contact</h2>
					<p>
						<strong>Email</strong>{" "}
						<a href={`malito:${bio.email}`}>{bio.email}</a>
					</p>
					<p>
						<strong>Github</strong>{" "}
						<a href={bio.github}>{bio.github.replace("https://", "")}</a>
					</p>
					<p>
						<strong>LinkedIn</strong>{" "}
						<a href={bio.linkedin}>{bio.linkedin.replace("https://", "")}</a>
					</p>
					<p>
						<strong>Medium</strong>{" "}
						<a href={bio.medium}>{bio.medium.replace("https://", "")}</a>
					</p>
					<SyntaxHighlighter language="sql" style={prismStyle}>
						{print(ResumeQuery)}
					</SyntaxHighlighter>
				</div>
				<div className="right">
					<h1>Experience</h1>
					{positions.map((position) => {
						console.log(position);
						const length = [
							position.years > 0 ? `${position.years} yrs` : null,
							position.months > 0 ? `${position.months} mths` : null,
						]
							.filter((str) => str)
							.join(" ");
						return (
							<div key={position.id}>
								<h2>{position.title}</h2>
								<p className="light">
									{position.company} | {position.location}
								</p>
								<p className="light">
									{format(new Date(position.startDate), "MMM-yyyy")} -{" "}
									{position.endDate
										? format(new Date(position.endDate), "MMM-yyyy")
										: "Present"}
								</p>
								<ul>
									{position.achievements.map((achievement) => (
										<li key={achievement}>{achievement}</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
