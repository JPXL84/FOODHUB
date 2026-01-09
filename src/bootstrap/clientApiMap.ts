import { loadJson } from "../utils/loadJson";
import { ClientTypeEnum } from "../constants";
import { ApiNameEnum } from "../constants";

interface ClientApiConfig {
  id: string;
  type: ClientTypeEnum;
  status: string;
  apis: ApiNameEnum[];
}

const clients = loadJson<ClientApiConfig[]>("clients.json");

export function getApisForClient(
  clientType: ClientTypeEnum
): ApiNameEnum[] {
  const client = clients.find(c => c.type === clientType);
  return client ? client.apis : [];
}
