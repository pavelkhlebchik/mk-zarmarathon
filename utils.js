const randomNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getDate = () => {
	const date = new Date();
	const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
	const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

	return time;
};

const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
};

export { randomNumbers, createElement, getDate };