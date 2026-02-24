import type { IExecuteFunctions, INodeExecutionData, IDataObject, INodeProperties } from 'n8n-workflow';
import { tableManagementApiRequest } from '../../shared/transport';
import { processResponse, wrapData, cleanBody } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['updateRecord'],
			},
		},
		default: 0,
		description: 'ID of the record to update',
	},
	{
		displayName: 'Table ID',
		name: 'tableId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['updateRecord'],
			},
		},
		default: 0,
		description: 'ID của bảng',
	},
	{
		displayName: 'Username',
		name: '_username',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['updateRecord'],
			},
		},
		default: '',
		description: 'Người thực hiện (username)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['updateRecord'],
			},
		},
		options: [
			{
				displayName: 'Name (First Column)',
				name: '_name',
				type: 'string',
				default: '',
				description: 'Value of the first column in the table',
			},
		],
	},
	{
		displayName: 'Dynamic Fields',
		name: 'dynamicFields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['updateRecord'],
			},
		},
		options: [
			{
				displayName: 'Field',
				name: 'fields',
				values: [
					{
						displayName: 'Field Number',
						name: 'fieldNumber',
						type: 'string',
						default: '1',
						placeholder: '1, 2, 3...',
						description: 'Field number (e.g., 1 for f1, 2 for f2)',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Field value',
					},
				],
			},
		],
		description: 'Dynamic fields f1, f2, f3... based on table column order',
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as number;
	const tableId = this.getNodeParameter('tableId', index) as number;
	const username = this.getNodeParameter('_username', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	
	const body: IDataObject = {
		id: recordId,
		table_id: tableId,
		_username: username,
	};

	// Add _name if provided
	if (additionalFields._name) {
		body._name = additionalFields._name;
	}

	// Get dynamic fields collection
	const dynamicFields = this.getNodeParameter('dynamicFields', index, {}) as IDataObject;
	
	// Add dynamic f1, f2, f3... fields
	if (dynamicFields.fields && Array.isArray(dynamicFields.fields)) {
		for (const field of dynamicFields.fields as Array<{fieldNumber: string; value: string}>) {
			if (field.fieldNumber && field.value !== undefined) {
				body[`f${field.fieldNumber}`] = field.value;
			}
		}
	}

	const response = await tableManagementApiRequest.call(this, 'POST', '/record/edit', cleanBody(body));
	const result = processResponse(response);
	return wrapData(result, index);
}
