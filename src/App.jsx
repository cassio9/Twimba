import Scrimba from "./images/scrimbalogo.png";
import { tweetsData } from "./data/data.js";
import Tweet from "./components/Tweet";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
	const [newTweet, setNewTweet] = useState("");
	const [twee, setTwee] = useState(tweetsData);

	const tweetsHtml = twee.map((tweetada) => {
		return <Tweet key={tweetada.uuid} {...tweetada} />;
	});

	function inputNewTweetToData() {
		if (newTweet) {
			setTwee((prevState) => {
				return [
					{
						handle: `@Scrimba`,
						profilePic: `images/scrimbalogo.png`,
						likes: 0,
						retweets: 0,
						tweetText: newTweet,
						replies: [],
						isLiked: false,
						isRetweeted: false,
						uuid: nanoid(),
					},
					...prevState,
				];
			});
		}
		setNewTweet("");
	}

	return (
		<div className="flex flex-col items-start  ml-10 my-5 font-Roboto max-w-[350px] overflow-hidden">
			<nav className="text-3xl  text-[#0F8CDF] ">Twimba</nav>
			<div className="flex items-start mt-10 w-[60%] min-w-[320px] max-w-[400px]">
				<img src={Scrimba} className="w-16 h-16 rounded-full" alt="" />
				<textarea
					className="ml-3 w-full leading-7 placeholder:text-2xl p-4 text-2xl resize-none"
					name="Whats"
					placeholder="What's happening?"
					id=""
					cols="18"
					value={newTweet}
					rows="3"
					onChange={(e) => setNewTweet(e.target.value)}></textarea>
			</div>
			<button
				className="bg-[#0F8CDF] text-white rounded-3xl text-2xl font-bold py-2 px-[140px] mt-5"
				onClick={inputNewTweetToData}>
				Tweet
			</button>
			<div className="mt-10">{tweetsHtml}</div>
		</div>
	);
}
export default App;
