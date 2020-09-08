import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apolloClient";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	const client = useApollo();
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
