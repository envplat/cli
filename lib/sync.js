require('colors');
const axios = require('axios');
const fs = require('fs');

const sync = (options) => {
	const { host, access } = options;

	const startTime = new Date();
	console.log('[info] syncing...'.bold.blue);

	const path = `${host}/api/projects?access=${access}`;

	axios.get(path).then(({ data }) => {
		if (!data.ok) {
			console.log(`[error] an error occurred`.bold.red);
			return;
		}

		if (!data.project) {
			console.log(`[error] invalid access`.bold.red);
			return;
		}

		let content = '';
		const endTime = new Date();
		const deltaInMs = endTime - startTime;

		console.log(`[success] synced (took ${deltaInMs}ms)`.bold.green);

		data.project.envs.forEach((env) => {
			content += `${env.name}=${env.value}\n`;
		});

		fs.writeFileSync('.env', content);
	});
};

module.exports = sync;
