import type { INodeProperties } from 'n8n-workflow';

export * as record from './record';

const resourceDescription: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Record',
			value: 'record',
		},
	],
	default: 'record',
};

export const description: INodeProperties[] = [resourceDescription];
