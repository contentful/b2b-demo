const AIR_HEADER = 'xj823lbq';

class SAPClient {
  public readonly apiEndpoint = process.env.NEXT_PUBLIC_SAP_API_ENDPOINT;
  public readonly baseSite = process.env.NEXT_PUBLIC_SAP_BASE_SITE;

  constructor() {}

  public async get(
    endpoint: string,
    queryParams: string | Record<string, string> = ''
  ): Promise<any> {
    const url = this.buildURL(endpoint, queryParams);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.buildRequestHeaders(),
    });

    await this.handleApiError(response);

    const data: any = await response.json();
    return data;
  }

  private buildRequestHeaders() {
    return {
      'content-type': 'application/json',
      'application-interface-key': AIR_HEADER,
    };
  }

  private buildURL(
    endpoint: string,
    queryParams?: string | Record<string, string>
  ): string {
    const params = queryParams ? new URLSearchParams(queryParams) : undefined;
    const url = `${this.apiEndpoint}/occ/v2/${this.baseSite}/${endpoint}/${
      params ? '?' + params.toString() : ''
    }`;
    return url;
  }

  // basic error handling
  private async handleApiError(response: Response): Promise<void> {
    if (response.status < 400) return null;
    const errorResponse: string = await response.text();
    const { statusText } = response;
    const msg = `SAP API error: ${errorResponse} [status: ${statusText}]`;
    throw new Error(msg);
  }
}

export default SAPClient;
