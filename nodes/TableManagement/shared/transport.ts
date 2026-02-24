import type { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';

/**
 * Make an API request to BaseVN - App Table
 * All requests use POST method and form-urlencoded content type
 */
export async function tableManagementApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('tableManagementApi');
	const domain = credentials.domain as string;
	const accessToken = credentials.accessToken as string;

	// Add access_token_v2 to body (required by Table API)
	const requestBody = {
		access_token_v2: accessToken,
		...body,
	};

	const options = {
		method,
		url: `https://table.${domain}/extapi/v1${endpoint}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: requestBody,
	};

	return await this.helpers.httpRequest(options);
}
