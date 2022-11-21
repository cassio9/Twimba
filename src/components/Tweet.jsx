import { useState, useEffect, useRef } from "react";
import Retweet from "./Retweet";
import AOS from "aos";
import "aos/dist/aos.css";

const imagePaths = [];
//          note relative path vvv                 vvv this gets rid of promises
Object.values(import.meta.glob("../images/*", { eager: true })).forEach(({ default: path }) => {
	const url = new URL(path, import.meta.url);
	const data = {
		path: url.pathname,
	};
	imagePaths.push(data);
});

function Tweet(props) {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);

	const [showMessages, setShowMessages] = useState(false);
	// conditional rendering animation -- pending
	const [isMounted, setIsMounted] = useState(false);
	const [likes, setLikes] = useState(() => Number(props.likes));
	const [retw, setRetw] = useState(() => Number(props.retweets));

	const likesEl = useRef(null);
	const retwEl = useRef(null);

	function showMsg() {
		setIsMounted((prev) => !prev);
		setShowMessages((prev) => !prev);
	}

	function addLike() {
		if (likes === props.likes) {
			setLikes((prev) => prev + 1);
			likesEl.current.style.color = "red";
		} else {
			setLikes(props.likes);
			likesEl.current.style.color = "#999";
		}
	}

	function addRetw() {
		if (retw === props.retweets) {
			setRetw((prev) => prev + 1);
			retwEl.current.style.color = "lightgreen";
		} else {
			setRetw(props.retweets);
			retwEl.current.style.color = "#999";
		}
	}

	const retweetsHTML = props.replies.map((retweet) => {
		return <Retweet {...retweet} />;
	});

	return (
		<div className="" data-aos="fade-right">
			<div className="flex items-start border-t-2 py-5 w-full">
				<img className="w-16 h-16 rounded-full mr-3" src={`src/${props.profilePic}`} alt="" />
				<div>
					<p className="mb-4 text-md text-gray-600">{props.handle}</p>
					<p className="text-lg">{props.tweetText}</p>
					<div className="flex gap-12 mt-5">
						<p className="cursor-pointer text-[#999] text-lg" onClick={showMsg}>
							<i className="fa-regular fa-comment-dots mr-2"></i>
							{props.replies.length}
						</p>
						<p className="cursor-pointer text-[#999] text-lg" onClick={addLike}>
							<i className="fa-solid fa-heart" ref={likesEl}></i> {likes}
						</p>
						<p className="cursor-pointer text-[#999] text-lg" onClick={addRetw}>
							<i className="fa-solid fa-retweet" ref={retwEl}></i> {retw}
						</p>
					</div>
				</div>
			</div>
			{showMessages && (
				<div className="" data-aos="fade-right">
					{retweetsHTML}
				</div>
			)}
		</div>
	);
}

export default Tweet;
