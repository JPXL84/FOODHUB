import { BootstrapContext } from "../types/bootstrap";
import { SYSTEM_DEFAULTS } from "./defaults";
import { CLIENT_CAPABILITIES } from "./clientCapabilities";
import { resolveFeatures } from "./plugins";
import { normalizeClientType } from "./normalizeClientType";
import { getApisForClient } from "./clientApiMap";
import { META } from "../types/constants";

export function buildBootstrap(ctx: BootstrapContext) {
  const clientType = normalizeClientType(ctx.clientType);

  return {
    system: SYSTEM_DEFAULTS,

    client: {
      type: clientType,
      capabilities: CLIENT_CAPABILITIES[clientType],
      apis: getApisForClient(clientType)
    },

    features: resolveFeatures({ clientType }),

    meta: {
      version: META.VERSION,
      generatedAt: new Date().toISOString()
    }
  };
}
