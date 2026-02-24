import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import * as record from './resources/record';

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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tableManagementApi',
				required: true,
			},
		],
		properties: [
			{
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
			},
			...record.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[] = [];

				if (resource === 'record') {
					const operation = this.getNodeParameter('operation', i) as string;
					
					if (operation === 'createRecord') {
						responseData = await record.createRecord.execute.call(this, i);
					} else if (operation === 'updateRecord') {
						responseData = await record.updateRecord.execute.call(this, i);
					} else if (operation === 'getRecords') {
						responseData = await record.getRecords.execute.call(this, i);
					}
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					const message = (error as Error).message;
					returnData.push({ json: { error: message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
