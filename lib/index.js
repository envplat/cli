const { version } = require('../package.json');
const { Command } = require('commander');
const sync = require('./sync');

const program = new Command();

program
	.name('envplat')
	.description('Environment Platform CLI')
	.version(version);

program
	.command('sync')
	.description('Sync the environment')
	.option('-h, --host <host>', 'Hostname of the envplat server')
	.option('-a, --access <access>', 'Access key of the project')
	.action((options) => {
		sync(options);
	});

program.parse();
