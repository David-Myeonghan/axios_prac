const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const updateBtn = document.getElementById('update');
const deleteBtn = document.getElementById('delete');
const getPost = document.getElementById('getPost');
const customHeader = document.getElementById('customHeader');
const transfrom = document.getElementById('transfrom');
const error = document.getElementById('error');
const cancel = document.getElementById('cancel');

// AXIOS GLOBALS // put them in localStorage and into header?
axios.defaults.headers.common['X-Auth-Token'] =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET request
function getTodos() {
	// axios({
	// 	method: 'get',
	// 	url: 'https://jsonplaceholder.typicode.com/todos',
	// 	params: {
	// 		_limit: 5,
	// 	},
	// })
	// 	.then((res) => console.log(res.data))
	// 	.catch((err) => console.error(err));
	// axios
	// 	.get('https://jsonplaceholder.typicode.com/todos', {
	// 		params: {
	// 			_limit: 5,
	// 		},
	// 	})
	axios // { timeout: 5000 }
		.get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 5000 })
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
}

// POST Request
function addTodo() {
	// axios({
	// 	method: 'post',
	// 	url: 'https://jsonplaceholder.typicode.com/todos',
	// 	data: {
	// 		title: 'New Todo',
	// 		compledted: false,
	// 	},
	// })
	// 	.then((res) => console.log(res.data))
	// 	.catch((err) => console.error(err));

	axios
		.post('https://jsonplaceholder.typicode.com/todos', {
			title: 'New Todo',
			compledted: false,
		})
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
}

// PUT: replace whole data /PATCH: increment. Request
function updateTodo() {
	axios
		.patch('https://jsonplaceholder.typicode.com/todos/1', {
			title: 'Updated Todo',
			completed: true,
		})
		.then((res) => console.log(res.data))
		.catch((err) => console.error(err));
}

// DELETE Request
function removceTodo() {
	axios
		.delete('https://jsonplaceholder.typicode.com/todos/1')
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
	axios
		.all([
			axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
			axios.post('https://jsonplaceholder.typicode.com/todos', { title: 'New Todo', completed: false }), // post
		])
		.then(
			axios.spread((todos, posts) => {
				console.log(posts.data);
				console.log(todos.data);
			})
		)
		.catch((err) => console.error(err));
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
	(config) => {
		console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// CUSTOM HEADERS: JWT login authentication to send user token put in header
function customHeaders() {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'someToken',
		},
	};
	axios
		.post(
			'https://jsonplaceholder.typicode.com/todos',
			{
				title: 'New Todo',
				compledted: false,
			},
			config
		)
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES // rarely used...
function transformResponse() {
	const options = {
		method: 'post',
		url: 'https://jsonplaceholder.typicode.com/todos',
		data: {
			title: 'Hello World',
		},
		transformResponse: axios.defaults.transformResponse.concat((data) => {
			data.title = data.title.toUpperCase();
			return data;
		}),
	};

	axios(options)
		.then((res) => console.log(res))
		.catch((err) => console.error(err));
}

// Error Handling
function errorHandling() {
	// axios
	// 	.get('https://jsonplaceholder.typicode.com/todoss')
	// 	.then((res) => console.log(res))
	// 	.catch((err) => {
	// 		if (err.response) {
	// 			// Server responded with a status other than 200 range
	// 			console.log(err.response.data);
	// 			console.log(err.response.status);
	// 			console.log(err.response.headers);
	// 		} else if (err.request) {
	// 			// Request was made but no response
	// 			console.error(err.request);
	// 		} else {
	// 			console.error(err.message);
	// 		}
	// 	});

	axios
		.get('https://jsonplaceholder.typicode.com/todoss', {
			validateStatus: function (status) {
				return status < 500; // Reject only if status is greater or equal to 500
				// shouldn't catch, but run normally without data.
				// In order to limit your catch to certain status.
			},
		})
		.then((res) => console.log(res))
		.catch((err) => {
			if (err.response) {
				// Server responded with a status other than 200 range
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			} else if (err.request) {
				// Request was made but no response
				console.error(err.request);
			} else {
				console.error(err.message);
			}
		});
}

// Cancel Token // Rarely used.
function cancelToken() {
	const source = axios.CancelToken.source();

	axios
		.get('https://jsonplaceholder.typicode.com/todos', {
			cancelToken: source.token,
		})
		.then((res) => console.log(res))
		.catch((thrown) => {
			if (axios.inCancel(thrown)) {
				console.log('Request canceled', thrown.message);
			}
		});

	if (true) {
		source.cancel('Request canceled!');
	}
}

// AXIOS INSTANCE
const axiosInstance = axios.create({
	// Other custom settings
	baseURL: 'https://jsonplaceholder.typicode.com',
});
// axiosInstance.get('/comments').then((res) => console.log(res));

getBtn.addEventListener('click', getTodos);
postBtn.addEventListener('click', addTodo);
updateBtn.addEventListener('click', updateTodo);
deleteBtn.addEventListener('click', removceTodo);
getPost.addEventListener('click', getData);
customHeader.addEventListener('click', customHeaders);
transfrom.addEventListener('click', transformResponse);
error.addEventListener('click', errorHandling);
cancel.addEventListener('click', cancelToken);
