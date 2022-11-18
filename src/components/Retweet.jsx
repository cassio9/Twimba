const imagePaths = [];
//          note relative path vvv                 vvv this gets rid of promises
Object.values(import.meta.glob("../images/*", { eager: true })).forEach(({ default: path }) => {
	const url = new URL(path, import.meta.url);
	const data = {
		path: url.pathname,
	};
	imagePaths.push(data);
});

function Retweet(props) {
	return (
		<div className="flex items-start ml-16 border-t-2 py-5 w-full">
			<img className="w-16 h-16 rounded-full mr-3" src={`src/${props.profilePic}`} alt="" />
			<div>
				<p className="mb-4 text-md text-gray-600">{props.handle}</p>
				<p className="text-lg w-[200px]">{props.tweetText}</p>
			</div>
		</div>
	);
}

export default Retweet;
