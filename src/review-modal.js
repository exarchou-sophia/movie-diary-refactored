export const createReviewFormularView = () => {
	const reviewContainer = document.createElement("div");

	// title
	const mainTitleView = document.createElement("h1");
	mainTitleView.textContent = "Your opinion matters";
	mainTitleView.classList.add("text-white", "rounded-xl", "text-center", "text-4xl");
	reviewContainer.appendChild(mainTitleView);

	// const titleView = document.createElement("h1");
	// titleView.textContent = "Did you enjoy this film?";
	// titleView.classList.add("font-sans", "text-white", "text-center");
	// reviewContainer.appendChild(titleView);

	// const textView = document.createElement("p");
	// textView.textContent = "tell us what you thought";
	// textView.classList.add("font-sans", "text-center", "text-white");
	// reviewContainer.appendChild(textView);

	// create emoji buttons
	const emojiContainer = document.createElement("ul");
	emojiContainer.classList.add(
		"flex",
		"list-none",
		"space-x-2",
		"items-center",
		"justify-center",
		"p-4",
		"w-full"
	);

	["😞", "😐", "😃", "🤩"].forEach((emoji) => {
		const emojiButton = document.createElement("li");
		emojiButton.style = "user-select: none; -webkit-user-select: none; cursor: pointer;";
		emojiButton.textContent = emoji;
		emojiButton.classList.add(
			"bg-none",
			"inline-block",
			"text-5xl",
			"text-center",
			"transform",
			"transition-transform",
			"ease-linear",
			"duration-300",
			"hover:scale-150",
			"active:border-none",
			"opacity-50",
			"w-full",
			"py-4"
		);

		emojiButton.onclick = (event) => {
			const clickedEmojiButton = event.target;

			const isOpacity = clickedEmojiButton.classList.contains("opacity-50");

			emojiContainer.querySelectorAll('li').forEach(eBtn => {
				eBtn.classList.add("opacity-50");
			})

			if (isOpacity)
				clickedEmojiButton.classList.remove("opacity-50");

		};

		emojiContainer.appendChild(emojiButton);
		reviewContainer.appendChild(emojiContainer);
	});

	// text area
	const reviewTextArea = document.createElement("textarea");
	reviewTextArea.id = "reviewTextArea";
	reviewTextArea.classList.add(
		"rounded-2xl",
		"p-4",
		"w-full",
		"mx-auto"
	);
	reviewTextArea.rows = 6
	reviewTextArea.placeholder = "Write your review here";
	reviewContainer.appendChild(reviewTextArea);

	const submitReviewButton = document.createElement("button");
	submitReviewButton.type = "submit";
	submitReviewButton.classList.add(
		"font-2xl",
		"rounded-2xl",
		"bg-[#020F1D]",
		"text-white",
		"m-6",
		"p-2",
		"duration-300",
		"mx-auto",
		"block",
		"w-full",
	);
	//  < mt-[1rem] py-[5px] px-[2rem] text-[1.4rem] bg-[#020F1D] rounded-full">+ Add to favorites</button>
	submitReviewButton.textContent = "Submit your review";
	submitReviewButton.onclick = () => {
		const textArea = document.getElementById("reviewTextArea");
		textArea.value = "";
		const reviewModalView = document.getElementById("review-modal");
		reviewModalView.classList.add("hidden");
		alert("Thank you! Your review has been submitted!");
	};
	reviewContainer.appendChild(submitReviewButton);

	const cancelButton = document.createElement("button");
	cancelButton.classList.add(
		"font-2xl",
		"rounded-2xl",
		"bg-[#020F1D]",
		"text-white",
		"p-2",
		"mx-auto",
		"block",
		"w-full",
	);
	cancelButton.textContent = "Maybe later";
	cancelButton.onclick = () => {
		const textArea = document.getElementById("reviewTextArea");
		textArea.value = "";
		const reviewModalView = document.getElementById("review-modal");
		reviewModalView.classList.add("hidden");
	};
	reviewContainer.appendChild(cancelButton);

	return reviewContainer;
}