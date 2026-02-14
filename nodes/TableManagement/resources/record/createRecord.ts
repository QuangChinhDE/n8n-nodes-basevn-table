import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { tableManagementApiRequest } from '../../shared/transport';
import { processResponse, wrapData, cleanBody } from '../../shared/utils';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as number;
	const username = this.getNodeParameter('username', index) as string;
	const name = this.getNodeParameter('_name', index) as string;
	
	// Get dynamic fields collection
	const dynamicFields = this.getNodeParameter('dynamicFields', index, {}) as IDataObject;
	
	const body: IDataObject = {
		table_id: tableId,
		username,
		_name: name,
	};

	// Add dynamic f1, f2, f3... fields
	if (dynamicFields.fields && Array.isArray(dynamicFields.fields)) {
		for (const field of dynamicFields.fields as Array<{fieldNumber: string; value: string}>) {
			if (field.fieldNumber && field.value !== undefined) {
				body[`f${field.fieldNumber}`] = field.value;
			}
		}
	}

	const response = await tableManagementApiRequest.call(this, 'POST', '/record/create', cleanBody(body));
	const result = processResponse(response);
	return wrapData(result, index);
}
