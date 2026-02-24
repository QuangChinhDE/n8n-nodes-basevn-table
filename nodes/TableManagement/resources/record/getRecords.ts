import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { tableManagementApiRequest } from '../../shared/transport';
import { processResponse, wrapData, cleanBody } from '../../shared/utils';

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
