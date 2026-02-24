import type {
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TableManagementApi implements ICredentialType {
	name = 'tableManagementApi';

	displayName = 'BaseVN - App Table API';

	icon: Icon = 'file:../icons/table.svg';

	documentationUrl = 'https://table.{domain}/extapi/v1';

	properties: INodeProperties[] = [
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'basevn.tech',
			description: 'Your domain (e.g., basevn.tech)',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Table API access token',
			required: true,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://table.{{$credentials.domain}}/extapi/v1',
			url: '/table/records',
			method: 'POST',
			body: {
				access_token_v2: '={{$credentials.accessToken}}',
				table_id: 1,
				page_id: 0,
				limit: 1,
			},
		},
	};
}
