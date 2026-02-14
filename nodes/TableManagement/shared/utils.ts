import type { IDataObject } from 'n8n-workflow';

/**
 * Clean and prepare body parameters (remove undefined/null values)
 */
export function cleanBody(body: IDataObject): IDataObject {
	const cleaned: IDataObject = {};
	for (const key in body) {
		if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
			cleaned[key] = body[key];
		}
	}
	return cleaned;
}

/**
 * Process API response - return data or full response
 */
export function processResponse(response: IDataObject): IDataObject {
	if (response.code === 1 && response.data) {
		return response.data as IDataObject;
	}
	return response;
}

/**
 * Wrap data for n8n output
 */
export function wrapData(data: IDataObject | IDataObject[], index: number) {
	if (Array.isArray(data)) {
		return data.map((item) => ({
			json: item,
			pairedItem: index,
		}));
	}
	return [{
		json: data,
		pairedItem: index,
	}];
}
