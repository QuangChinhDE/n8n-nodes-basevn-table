import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import * as resources from './resources';

export class TableManagement implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BaseVN - App Table',
		name: 'tableManagement',
		icon: 'file:../../icons/table.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with BaseVN Table Management API',
		defaults: {
			name: 'BaseVN - App Table',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'tableManagementApi',
				required: true,
			},
		],
		properties: [
			...resources.description,
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
						description: 'Create a new record in a table',
						action: 'Create a record',
					},
					{
						name: 'Get Records',
						value: 'getRecords',
						description: 'Get records from a table',
						action: 'Get records',
					},
					{
						name: 'Update Record',
						value: 'updateRecord',
						description: 'Update an existing record',
						action: 'Update a record',
					},
				],
				default: 'createRecord',
			},
			...resources.record.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		let responseData;
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'record') {
					if (operation === 'createRecord') {
						responseData = await resources.record.createRecord.execute.call(this, i);
					} else if (operation === 'updateRecord') {
						responseData = await resources.record.updateRecord.execute.call(this, i);
					} else if (operation === 'getRecords') {
						responseData = await resources.record.getRecords.execute.call(this, i);
					}
				}

				if (responseData) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);

					returnData.push(...executionData);
				}
			} catch (error: unknown) {
				if (this.continueOnFail()) {
					const message = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ json: { error: message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
