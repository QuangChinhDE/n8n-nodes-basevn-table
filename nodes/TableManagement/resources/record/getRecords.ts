import type { IExecuteFunctions, INodeExecutionData, IDataObject, INodeProperties } from 'n8n-workflow';
import { tableManagementApiRequest } from '../../shared/transport';
import { processResponse, wrapData, cleanBody } from '../../shared/utils';

export const description: INodeProperties[] = [
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
		description: 'ID of the table to get records from',
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
				description: 'Lọc theo người tạo (format: @ + username)',
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
				description: 'Trang muốn lấy (bắt đầu từ 0). Nếu điền thì mặc định limit = 100 record/page',
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

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	
	const body: IDataObject = {
		table_id: tableId,
		page_id: additionalFields.pageId,
		limit: additionalFields.limit || 20,
	};

	// Add filters if provided
	if (additionalFields.createdBy) body.created_by = additionalFields.createdBy;
	if (additionalFields.createdFrom) body.created_from = additionalFields.createdFrom;
	if (additionalFields.createdTo) body.created_to = additionalFields.createdTo;
	if (additionalFields.updatedFrom) body.updated_from = additionalFields.updatedFrom;
	if (additionalFields.updatedTo) body.updated_to = additionalFields.updatedTo;

	const response = await tableManagementApiRequest.call(this, 'POST', '/table/records', cleanBody(body));
	const result = processResponse(response);
	return wrapData(result, index);
}
