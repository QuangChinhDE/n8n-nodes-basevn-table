import type { INodeProperties } from 'n8n-workflow';

// Create Record fields
export const createRecordFields: INodeProperties[] = [
	{
		displayName: 'Table ID',
		name: 'tableId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['createRecord'],
			},
		},
		default: 0,
		description: 'ID of the table',
	},
	{
		displayName: 'Username',
		name: '_username',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['createRecord'],
			},
		},
		default: '',
		description: 'Người thực hiện (username)',
	},
	{
		displayName: 'Name (First Column)',
		name: '_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['createRecord'],
			},
		},
		default: '',
		description: 'Value of the first column in the table',
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
				operation: ['createRecord'],
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
		description: 'Dynamic fields f1, f2, f3... based on table column order.',
	},
];

// Update Record fields
export const updateRecordFields: INodeProperties[] = [
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
				description: 'Update first column value',
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
						description: 'Updated field value',
					},
				],
			},
		],
		description: 'Dynamic fields to update (f1, f2, f3...)',
	},
];

// Get Records fields
export const getRecordsFields: INodeProperties[] = [
	{
		displayName: 'Table ID',
		name: 'tableId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['record'],
				operation: ['getRecords'],
			},
		},
		default: 0,
		description: 'ID of the table',
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
				operation: ['getRecords'],
			},
		},
		options: [
			{
				displayName: 'Created By',
				name: 'createdBy',
				type: 'string',
				default: '',
				placeholder: '@username',
				description: 'Lọc theo người tạo (format: @ + username, VD: @john)',
			},
			{
				displayName: 'Created From',
				name: 'createdFrom',
				type: 'string',
				default: '',
				placeholder: 'dd/MM/yyyy',
				description: 'Lọc từ ngày tạo (định dạng: dd/MM/yyyy)',
			},
			{
				displayName: 'Created To',
				name: 'createdTo',
				type: 'string',
				default: '',
				placeholder: 'dd/MM/yyyy',
				description: 'Lọc đến ngày tạo (định dạng: dd/MM/yyyy)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-limit
				default: 20,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-limit
				description: 'Số bản ghi tối đa trả về (default: 20, max: 500)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'number',
				default: '',
				description: 'Trang muốn lấy (bắt đầu từ 0). Nếu điền thì mặc định limit = 100 record/page.',
			},
			{
				displayName: 'Updated From',
				name: 'updatedFrom',
				type: 'string',
				default: '',
				placeholder: 'dd/MM/yyyy',
				description: 'Lọc từ ngày cập nhật (định dạng: dd/MM/yyyy)',
			},
			{
				displayName: 'Updated To',
				name: 'updatedTo',
				type: 'string',
				default: '',
				placeholder: 'dd/MM/yyyy',
				description: 'Lọc đến ngày cập nhật (định dạng: dd/MM/yyyy)',
			},
		],
	},
];
