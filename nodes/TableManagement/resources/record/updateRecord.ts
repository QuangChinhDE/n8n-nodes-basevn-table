import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { tableManagementApiRequest } from '../../shared/transport';
import { processResponse, wrapData, cleanBody } from '../../shared/utils';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as number;
	const username = this.getNodeParameter('username', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	
	const body: IDataObject = {
		id: recordId,
		username,
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
