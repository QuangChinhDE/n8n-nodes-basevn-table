import type { INodeProperties } from 'n8n-workflow';
import * as createRecord from './createRecord';
import * as updateRecord from './updateRecord';
import * as getRecords from './getRecords';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['record'],
			},
		},
		options: [
			{
				name: 'Create Record',
				value: 'createRecord',
				action: 'Create a new record',
			},
			{
				name: 'Get Records',
				value: 'getRecords',
				action: 'Get records from table',
			},
			{
				name: 'Update Record',
				value: 'updateRecord',
				action: 'Update an existing record',
			},
		],
		default: 'createRecord',
	},
	...createRecord.description,
	...updateRecord.description,
	...getRecords.description,
];

export { createRecord, updateRecord, getRecords };
